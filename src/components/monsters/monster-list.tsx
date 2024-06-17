'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_MONSTERS, type MonsterData } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

export const MonsterItem = ({ item }: { item: MonsterData }) => (
  <>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm font-extralight">{item.type}</p>
    <p className="text-sm font-extralight">CR: {item.challenge_rating}</p>
  </>
);

const useMonsters = () => {
  const { data: { result } } = useSuspenseQuery(GET_ALL_MONSTERS);
  return result;
};

export default function MonsterList() {

  const monsters = useMonsters();
  const filteredMonsters = useSearchFilter(monsters);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {filteredMonsters.map(({index, ...monster}) => (
        // .sort((a, b) => a.challenge_rating! - b.challenge_rating!)
        <ReferenceItem key={index} index={index}>
          <p className="font-medium">{monster.name}</p>
          <p className="text-sm font-extralight">{monster.type}</p>
          <p className="text-sm font-extralight">CR: {monster.challenge_rating}</p>
        </ReferenceItem>
      ))}
    </ul>
  );
}