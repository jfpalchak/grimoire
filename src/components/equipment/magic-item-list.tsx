'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_MAGIC_ITEMS, type MagicItemData } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

export const MagicItemItem = ({ item }: { item: MagicItemData }) => (
  <>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">Rarity: {item.rarity}</p>
    <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
  </>
);

const useMagicItems = () => {
  const { data: { result } } = useSuspenseQuery(GET_ALL_MAGIC_ITEMS);
  return result;
}

export default function MagicItemList() {

  const items = useMagicItems();
  const filteredItems = useSearchFilter(items);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {filteredItems.map((item) => (
        <ReferenceItem key={item.index} index={item.index}>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm font-extralight">Rarity: {item.rarity}</p>
          <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
        </ReferenceItem>
      ))}
    </ul>
  );
}