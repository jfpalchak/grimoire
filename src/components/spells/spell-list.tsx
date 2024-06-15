'use client';

import Link from 'next/link';
import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

type SpellData = {
  name: string;
  index: string;
  level: number;
  school: {
    name: string;
    index: string;
  }
};

const formatLevel = (level: number) => {
  switch (level) {
    case 0:
      return 'cantrip';
    case 1:
      return '1st level';
    case 2:
      return '2nd level';
    case 3:
      return '3rd level';
    default:
      return `${level}th level`;
  }
};

export const SpellItem = ({ item }: { item: SpellData }) => (
  <Link
    key={item.index}
    href={`/spells/${item.index}`}
    className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="p-4">
      <p className="font-medium">{item.name}</p>
      <p className="text-sm font-extralight">{item.school.name}</p>
      <p className="text-sm font-extralight">{formatLevel(item.level)}</p>
    </div>
  </Link>
);

const useSpells = () => {
  const { data: { spells } } = useSuspenseQuery(GET_ALL_SPELLS);
  return spells;
};

export default function SpellList() {

  const spells = useSpells();
  const filteredSpells = useSearchFilter(spells);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {filteredSpells.map((item) => (
        <ReferenceItem key={item.index} index={item.index}>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm font-extralight">{item.school.name}</p>
          <p className="text-sm font-extralight">{formatLevel(item.level)}</p>
        </ReferenceItem>
      ))}
    </ul>
  );
}