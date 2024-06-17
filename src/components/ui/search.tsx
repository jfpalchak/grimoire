'use client';

import React from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term.toLowerCase());
    } else {
      params.delete('query');
    }
    const search = params.toString();
    const query = search ? `?${search}` : '';
    // useRouter().replace() or push() causes a refresh of the entire page relying on our current URL,
    // sending a network request each time the page reloads - so as a work around we'll use the History API.
    // * look into using nuqs / useQueryState
    window.history.replaceState(null, '', `${pathname}${query}`);
  }, 300);

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
