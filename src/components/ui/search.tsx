'use client';

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term.toLowerCase());
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="mb-1 p-2 w-full rounded-lg outline-2 outline-offset-2 border-2"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
