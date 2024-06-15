import React, { Suspense } from 'react'

import Search from '@/components/ui/search';
import SpellList from '@/components/spells/spell-list';
import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';

export default async function SpellsPage() {

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Spells</p>
        <br/> 
        <Search />
      </header>
      <div>
        <PreloadQuery query={GET_ALL_SPELLS}>
          <Suspense fallback={<p>LOADING</p>}>
            <SpellList />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
  );
}
