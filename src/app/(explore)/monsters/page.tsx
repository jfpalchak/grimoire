import React, { Suspense } from 'react'

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_MONSTERS } from '@/lib/graphql/queries';
import MonsterList from '@/components/monsters/monster-list';
import ListLayout from '@/components/layouts/list-layout';

export default async function MonstersPage() {
  return (
    <ListLayout>
      <PreloadQuery query={GET_ALL_MONSTERS}>
        <Suspense fallback={<p>LOADING</p>}>
          <MonsterList />
        </Suspense>
      </PreloadQuery>
    </ListLayout>
  );
}
