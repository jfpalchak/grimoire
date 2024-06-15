'use client';

import Link from 'next/link';
import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_MAGIC_ITEMS } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

type MagicItemData = {
  name: string;
  index: string;
  rarity: string;
  equipment_category: {
    name: string;
  };
};

export const MagicItemItem = ({ item }: { item: MagicItemData }) => (
  <Link
    key={item.index}
    href={`/magic-items/${item.index}`}
    className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="p-4">
      <p className="font-medium">{item.name}</p>
      <p className="text-sm font-extralight">Rarity: {item.rarity}</p>
      <p className="text-sm font-extralight">Gear: {item.equipment_category.name}</p>
    </div>
  </Link>
);

const useMagicItems = () => {
  const { data: { magicItems } } = useSuspenseQuery(GET_ALL_MAGIC_ITEMS);
  return magicItems;
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