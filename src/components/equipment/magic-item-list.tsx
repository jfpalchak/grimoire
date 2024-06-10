'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  data: {
    name: string;
    index: string;
    rarity: string;
    equipment_category: {
      name: string;
    };
  }[];
};

export default function MagicItemList({ data }: Props) {

  // const { data: { items } } = useSuspenseQuery(GET_ALL_MAGIC_ITEMS);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const items = useMemo(() => {
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
      {[...items]
        .map((item) => (
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
        ))}
    </ul>
  );
}