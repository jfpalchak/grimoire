import React from 'react'
import { notFound } from 'next/navigation';

import Search from '@/components/ui/search';
import EquipmentList from '@/components/equipment/equipment-list';
import { dndGraph } from '@/lib/graphql/apollo-client';
import { GET_ALL_EQUIPMENT } from '@/lib/graphql/queries';

export const getEquipments = async () => {
  const { equipments } = await dndGraph.query(GET_ALL_EQUIPMENT);
  return equipments;
}

export default async function EquipmentsPage() {

  const data = await getEquipments();

  if (!data) {
    notFound();
  }

  return (
    <section className="m-10">
      <header className="border-b-2 font-semibold">
        <p>Category: Equipment</p>
        <br/> 
        <Search />
      </header>
      <div>
        <EquipmentList data={data} />
        {/* <PreloadQuery query={GET_ALL_EQUIPMENT}>
          <Suspense fallback={<p>LOADING</p>}>
            <EquipmentList />
          </Suspense>
        </PreloadQuery> */}
      </div>
    </section>
  )
}
