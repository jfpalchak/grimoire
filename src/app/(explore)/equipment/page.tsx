import React, { Suspense } from 'react'

import Search from '@/components/ui/search';
import EquipmentList from '@/components/equipment/equipment-list';
import { PreloadQuery } from '@/lib/graphql/apollo-client';
import { GET_ALL_EQUIPMENT } from '@/lib/graphql/queries';

export default async function EquipmentsPage() {

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Equipment</p>
        <br/> 
        <Search />
      </header>
      <div>
        <PreloadQuery query={GET_ALL_EQUIPMENT}>
          <Suspense fallback={<p>LOADING</p>}>
            <EquipmentList />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
  );
}
