import React from 'react'
import Link from 'next/link';
import { fetchDND } from '@/lib/services';
import Search from '@/components/ui/search';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    category: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function Page({ params: { category }, searchParams }: Params) {

  const data = await fetchDND(category);

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
          {data.results.filter(searchFilter).map((item: { index: string, name: string, level?: number}) => (
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
