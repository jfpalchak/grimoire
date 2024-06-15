'use client';

import Link from 'next/link';
import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_MONSTERS } from '@/lib/graphql/queries';
import { ReferenceItem } from '../reference-item';
import { useSearchFilter } from '@/hooks/user-search-filter';

type MonsterData = {
  name: string;
  index: string;
  type: string;
  challenge_rating: number;
};

export const MonsterItem = ({ item }: { item: MonsterData }) => (
  <Link
    key={item.index}
    href={`/monsters/${item.index}`}
    className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="p-4">
      <p className="font-medium">{item.name}</p>
      <p className="text-sm font-extralight">{item.type}</p>
      <p className="text-sm font-extralight">CR: {item.challenge_rating}</p>
    </div>
  </Link>
);

const useMonsters = () => {
  const { data: { monsters } } = useSuspenseQuery(GET_ALL_MONSTERS);
  return monsters;
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