'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';
import { useSearchFilter } from '@/hooks/user-search-filter';
import { ReferenceItem, RefHeader, RefText } from '@/components/reference-item';

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

const useSpells = () => {
  const { data: { spells } } = useSuspenseQuery(GET_ALL_SPELLS);
  return spells;
};

export default function SpellList() {

  const spells = useSpells();
  const filteredSpells = useSearchFilter(spells);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {filteredSpells.map(({ index, ...item }) => (
        <ReferenceItem key={index} index={index}>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm font-extralight">{item.school.name}</p>
          <p className="text-sm font-extralight">{formatLevel(item.level)}</p>
        </ReferenceItem>
      ))}
    </ul>
  );
}