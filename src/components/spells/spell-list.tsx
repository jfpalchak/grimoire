'use client';

import { GET_ALL_SPELLS } from '@/lib/graphql/queries';
import { useSuspenseQuery } from '@apollo/client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  data: {
    name: string;
    index: string;
    level: number;
    school: {
      name: string;
      index: string;
    }
  }[];
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

export default function SpellList({ data }: Props) {

  // const { data: { spells } } = useSuspenseQuery(GET_ALL_SPELLS);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const spells = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value !== 'object') {
          return value.toString().toLowerCase().includes(query);
        }
        return Object.values(value).some((v) => v.toString().toLowerCase().includes(query))
      })
    );
  }, [data, query]);
  
  return (
    <ul className="mt-5 flex flex-col gap-2">
      {[...spells]
        // .sort((a, b) => a.level! - b.level!)
        .map((item) => (
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
        ))}
    </ul>
  );
}