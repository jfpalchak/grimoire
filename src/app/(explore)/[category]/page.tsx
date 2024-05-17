import React from 'react'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dnd } from '@/lib/api';
import Search from '@/components/ui/search';
import type { APIResponse } from '@/types';

type Params = {
  params: {
    category: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

// Don't use searchParams as props, as this sends a network request each time we 
// update the searchParams and receive new prop values from the server.
// Instead, we'll want to use the useSearchParams hook in a client component, 
// as this will save our Page from sending new network requests each time we update the url search params.
export default async function Page({ params: { category }, searchParams }: Params) {

  const data: APIResponse = await dnd.get(category);

  if (!data) {
    notFound();
  }

  const searchFilter = (item: any) => {
    return (
      !searchParams.query 
      || item.name.toLowerCase().includes(searchParams.query)
      || item.level == searchParams.query
    );
  }

  return (
    <section className="m-10">
      <div className="border-b-2 font-semibold">
        <p>Category: {category}</p>
        <br/>
        <Search />
      </div>
      <div>
        <ul className="mt-5 flex flex-col gap-2">
          {data.results.filter(searchFilter).map((item) => (
            <Link
              key={item.index}
              href={`${category}/${item.index}`}
              className="w-48"
            >
              <div className="p-4 shadow-md">
                <p>{item.name}</p>
                {(typeof item.level === 'number') && <p>Level: {item.level}</p>}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  )
}
