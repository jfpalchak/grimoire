import { Suspense } from 'react';
import MagicItemCard from '@/components/equipment/magic-item-card';

export default async function MagicItemPage({ params }: { params: { index: string }}) {
  const { index } = params;

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Magic Items</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <MagicItemCard index={index} />
      </Suspense>
    </section>
  );
}