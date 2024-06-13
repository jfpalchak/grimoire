'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type NestedObject = {
  [key: string]: string | number | object;
}

export const useSearchFilter = <T extends NestedObject>(data: T[]): T[] => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value !== 'object'
            ? value.toString().toLowerCase().includes(query)
            : Object.values(value).some((v) =>
                v.toString().toLowerCase().includes(query)
              )
      )
    );
  }, [data, query]);

  return filteredData;
};
