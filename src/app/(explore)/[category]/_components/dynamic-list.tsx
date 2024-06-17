'use client';

import { usePathname } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';

import { useSearchFilter } from '@/hooks/user-search-filter';
import { getCategoryConfig } from '@/config/category';
import { type QueryData } from '@/lib/graphql/queries';

const useItemsByCategory = (category: string) => {
  const {
    query: QUERY_CATEGORY_ITEMS,
  } = getCategoryConfig(category);

  const {
    data: { result },
  } = useSuspenseQuery(QUERY_CATEGORY_ITEMS);

  return result;
};

const getDynamicItemComponent = (category: string) => {
  const {
    item: Component,
  } = getCategoryConfig(category);

  return Component as React.FC<{ item: QueryData }>;
};

export default function DynamicList() {

  const [, category] = usePathname().split('/');

  const items = useItemsByCategory(category);
  const ItemComponent = getDynamicItemComponent(category);

  const filteredItems = useSearchFilter(items);

  // # WIP: Pagination # //
  // const searchParams = useSearchParams();
  // const page = parseInt(searchParams.get('page') ?? '1');
  // const pageSize = 50;

  // const totalPages = Math.ceil(filteredItems.length / pageSize);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {/* <Pagination currentPage={page} totalPages={totalPages} /> */}
      {filteredItems.map((item) => (
        <ItemComponent key={item.index} item={item} />
      ))}
    </ul>
  );
}