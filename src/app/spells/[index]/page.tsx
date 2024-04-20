import React from 'react';
import { fetchCategoryIndex } from '@/lib/queries';
import SpellCard from '@/components/spell-card';

export default async function MonsterPage({ params }: { params: { index: string }}) {
  const { index } = params;

  const data = await fetchCategoryIndex('spells', index);

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Spells!</p>
      </div>
      <SpellCard spell={data} />
    </section>
  );
}
