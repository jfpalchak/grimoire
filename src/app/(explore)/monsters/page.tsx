import React from 'react'
import { notFound } from 'next/navigation';

import Search from '@/components/ui/search';
import MonsterList from '@/components/monsters/monster-list';
import { dndGraph } from '@/lib/graphql/apollo-client';
import { GET_ALL_MONSTERS } from '@/lib/graphql/queries';

export const getMonsters = async () => {
  const { monsters } = await dndGraph.query(GET_ALL_MONSTERS);
  return monsters;
}

export default async function MonstersPage() {

  const data = await getMonsters();

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Monsters</p>
        <br/> 
        <Search />
      </header>
      <div>
        <MonsterList data={data} />
        {/* <PreloadQuery query={GET_ALL_MONSTERS}>
          <Suspense fallback={<p>LOADING</p>}>
            <MonsterList />
          </Suspense>
        </PreloadQuery> */}
      </div>
    </section>
  )
}
