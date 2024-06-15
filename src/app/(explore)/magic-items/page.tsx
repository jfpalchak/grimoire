import React, { Suspense } from 'react'

import Search from '@/components/ui/search';
import MagicItemList from '@/components/equipment/magic-item-list';
import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_MAGIC_ITEMS } from '@/lib/graphql/queries';

export default async function MagicItemsPage() {

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Magic Items</p>
        <br/> 
        <Search />
      </header>
      <div>
        <PreloadQuery query={GET_ALL_MAGIC_ITEMS}>
          <Suspense fallback={<p>LOADING</p>}>
            <MagicItemList />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
  );
}
