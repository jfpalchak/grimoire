import React, { Suspense } from 'react'

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_MAGIC_ITEMS } from '@/lib/graphql/queries';
import MagicItemList from '@/components/equipment/magic-item-list';
import ListLayout from '@/components/layouts/list-layout';

export default async function MagicItemsPage() {
  return (
    <ListLayout>
      <PreloadQuery query={GET_ALL_MAGIC_ITEMS}>
        <Suspense fallback={<p>LOADING</p>}>
          <MagicItemList />
        </Suspense>
      </PreloadQuery>
    </ListLayout>
  );
}
