'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  data: any;
};

export default function List({ data }: Props) {

  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const items = useMemo(() => {
    if (!query) return data;
    return data.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          typeof value !== 'object'
            ? value.toString().toLowerCase().includes(query)
            : Object.values(value).some((v: any) =>
                v.toString().toLowerCase().includes(query)
              )
      )
    )
  }, [data, query]);

  return (
    <ul className="mt-5 flex flex-col gap-2">
      {items
        .map((item: any) => (
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