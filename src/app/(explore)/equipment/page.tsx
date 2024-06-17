import React, { Suspense } from 'react'

import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_EQUIPMENT } from '@/lib/graphql/queries';
import EquipmentList from '@/components/equipment/equipment-list';
import ListLayout from '@/components/layouts/list-layout';

export default async function EquipmentsPage() {
  return (
    <ListLayout>
      <PreloadQuery query={GET_ALL_EQUIPMENT}>
        <Suspense fallback={<p>LOADING</p>}>
          <EquipmentList />
        </Suspense>
      </PreloadQuery>
    </ListLayout>
  );
}
