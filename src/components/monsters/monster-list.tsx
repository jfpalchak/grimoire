'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  data: {
    name: string;
    index: string;
    type: string;
    challenge_rating: number;
  }[];
};

export default function MonsterList({ data }: Props) {

  // const { data: { monsters } } = useSuspenseQuery(GET_ALL_MONSTERS);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const monsters = useMemo(() => {
    if (!query) return data;
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.challenge_rating.toString() === query
    );
  }, [data, query]);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {[...monsters]
        // .sort((a, b) => a.challenge_rating! - b.challenge_rating!)
        .map((monster) => (
          <Link
            key={monster.index}
            href={`/monsters/${monster.index}`}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <p className="font-medium">{monster.name}</p>
              <p className="text-sm font-extralight">{monster.type}</p>
              <p className="text-sm font-extralight">CR: {monster.challenge_rating}</p>
            </div>
          </Link>
        ))}
    </ul>
  );
}