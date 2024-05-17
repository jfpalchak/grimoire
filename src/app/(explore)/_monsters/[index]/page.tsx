import { Suspense } from 'react';
import MonsterCard from '@/components/monsters/monster-card';

export default async function MonsterPage({ params }: { params: { index: string }}) {
  const { index } = params;

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Monsters</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <MonsterCard index={index} />
      </Suspense>
    </section>
  );
}
