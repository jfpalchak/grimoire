import React, { Suspense } from 'react'
import Search from '@/components/ui/search';
import SpellList from './_components/spell-list';
import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';
// import SpellFilters from './_components/spell-filter';

export default async function SpellsPage() {

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Spells</p>
        <br/> 
        <Search />
      </header>
      <div className="mt-4 mb-10">
        {/* <SpellFilters /> */}
      </div>
      <div>
        <PreloadQuery query={GET_ALL_SPELLS}>
          <Suspense fallback={<p>LOADING</p>}>
            <SpellList />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
  )
}
