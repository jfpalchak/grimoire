import { Suspense } from 'react'

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_SPELLS } from '@/lib/graphql/queries';
import SpellList from '@/components/spells/spell-list';
import ListLayout from '@/components/layouts/list-layout';

export default async function SpellsPage() {
  return (
    <ListLayout>
      <PreloadQuery query={GET_ALL_SPELLS}>
        <Suspense fallback={<p>LOADING</p>}>
          <SpellList />
        </Suspense>
      </PreloadQuery>
    </ListLayout>
  );
}
