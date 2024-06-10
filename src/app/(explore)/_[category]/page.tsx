import React from 'react'
import { notFound } from 'next/navigation';
import { dndRest } from '@/lib/rest/fetch';
import Search from '@/components/ui/search';
import List from './list';
import type { APIResponse } from '@/types';

type Params = {
  category: string;
};

type Props = {
  params: Params
};

const getCategoryByParams = async ({ category }: Params): Promise<APIResponse> => {
  return await dndRest.get(category);
};

export default async function Page({ params }: Props) {

  const data = await getCategoryByParams(params);

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: {params.category}</p>
        <br/> 
        <Search />
      </header>
      <div>
        <List data={data} />
      </div>
    </section>
  )
}
