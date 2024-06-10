import { Suspense } from 'react';
import EquipmentCard from '@/components/equipment/equipment-card';

export default async function EquipmentPage({ params }: { params: { index: string }}) {
  const { index } = params;

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Equipment</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <EquipmentCard index={index} />
      </Suspense>
    </section>
  );
}