import React from 'react';
import { notFound } from 'next/navigation';
import { getSpell } from '@/lib/queries';
import SpellCard from '@/components/spells/spell-card';

export default async function SpellsPage({ params }: { params: { index: string }}) {
  const { index } = params;

  const data = await getSpell(index);

  if (data.error) {
    notFound();
  }

  return (
    <section className="m-10">
      <div className="border-b-2">
        <p className="font-semibold">Category: Spells!</p>
      </div>
      <SpellCard spell={data} />
    </section>
  );
}
