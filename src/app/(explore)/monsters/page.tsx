import React, { Suspense } from 'react'

import Search from '@/components/ui/search';
import MonsterList from '@/components/monsters/monster-list';
import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_MONSTERS } from '@/lib/graphql/queries';

export default async function MonstersPage() {

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Monsters</p>
        <br/> 
        <Search />
      </header>
      <div>
        <PreloadQuery query={GET_ALL_MONSTERS}>
          <Suspense fallback={<p>LOADING</p>}>
            <MonsterList />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
  );
}
