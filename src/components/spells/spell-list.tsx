'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_SPELLS, type SpellData } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

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
  <>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">{item.school.name}</p>
    <p className="text-sm font-extralight">{formatLevel(item.level)}</p>
  </>
);

const useSpells = () => {
  const { data: { result } } = useSuspenseQuery(GET_ALL_SPELLS);
  return result;
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