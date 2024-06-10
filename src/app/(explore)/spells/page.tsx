import React from 'react'
import { notFound } from 'next/navigation';

import Search from '@/components/ui/search';
import SpellList from '@/components/spells/spell-list';
import { dndGraph } from '@/lib/graphql/apollo-client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';

export const getSpells = async () => {
  const { spells } = await dndGraph.query(GET_ALL_SPELLS);
  return spells;
}

export default async function SpellsPage() {

  const data = await getSpells();

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Spells</p>
        <br/> 
        <Search />
      </header>
      <div>
        <SpellList data={data} />
        {/* <PreloadQuery query={GET_ALL_SPELLS}>
          <Suspense fallback={<p>LOADING</p>}>
            <SpellList />
          </Suspense>
        </PreloadQuery> */}
      </div>
    </section>
  )
}
