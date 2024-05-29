'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { type  APIResponse } from '@/types';

type Props = {
  data: APIResponse;
};

export default function List({ data }: Props) {

  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const searchFilter = (item: any) => {
    return (
      !query
      || item.name.toLowerCase().includes(query)
      || item.level == query
    );
  }

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {data.results
        .filter(searchFilter)
        // .sort((a, b) => a.level! - b.level!)
        .map((item) => (
          <Link
            key={item.index}
            href={`${path}/${item.index}`}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <p className="font-medium">{item.name}</p>
              {(typeof item.level === 'number') && <p className="text-sm font-extralight">Level: {item.level}</p>}
            </div>
          </Link>
        ))}
    </ul>
  );
}