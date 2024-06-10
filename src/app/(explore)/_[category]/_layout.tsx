import React from 'react'
import { notFound } from 'next/navigation';
import { dndRest } from '@/lib/rest/fetch';
import Search from '@/components/ui/search';
import List from './list';
import type { APIResponse } from '@/types';

type Props = {
  params: {
    category: string;
  };
} & React.PropsWithChildren;

export default async function Page({ params: { category }, children}: Props) {

  const data: APIResponse = await dndRest.get(category);

  if (!data) {
    notFound();
  }

  return (
    <section className="px-4 mt-10 mx-auto relative flex grow-0 grid-cols-[250px_1fr] gap-2">
      <aside className="sticky h-[calc(100vh-3.5rem)] min-w-250px flex-none top-20 overflow-y-scroll">
        <header className="border-b-2 font-semibold">
          <p>Category: {category}</p>
          <br/>
          <Search />
        </header>
        <div>
          <List data={data} />
        </div>
      </aside>
      {children}
    </section>
  )
}
