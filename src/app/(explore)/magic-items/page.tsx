import React from 'react'
import { notFound } from 'next/navigation';

import Search from '@/components/ui/search';
import MagicItemList from '@/components/equipment/magic-item-list';
import { dndGraph } from '@/lib/graphql/apollo-client';
import { GET_ALL_MAGIC_ITEMS } from '@/lib/graphql/queries';

export const getMagicItems = async () => {
  const { magicItems } = await dndGraph.query(GET_ALL_MAGIC_ITEMS);
  return magicItems;
}

export default async function MagicItemsPage() {

  const data = await getMagicItems();

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Magic Items</p>
        <br/> 
        <Search />
      </header>
      <div>
        <MagicItemList data={data} />
        {/* <PreloadQuery query={GET_ALL_MAGIC_ITEMS}>
          <Suspense fallback={<p>LOADING</p>}>
            <MagicItemList />
          </Suspense>
        </PreloadQuery> */}
      </div>
    </section>
  )
}
