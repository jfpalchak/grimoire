import React from 'react';
import { fetchCategoryIndex } from '@/lib/queries';
import MonsterCard from '@/components/monster-card';

export default async function MonsterPage({ params }: { params: { index: string }}) {
  const { index } = params;

  const data = await fetchCategoryIndex('monsters', index);

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Monsters</p>
      </div>
      <MonsterCard monster={data} />
    </section>
  );
}
