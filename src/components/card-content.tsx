import React from 'react'
import { notFound } from 'next/navigation';
import { fetchQuery } from '@/lib/queries';
import MonsterCard from './monsters/monster-card';
import SpellCard from './spells/spell-card';

export default async function CardContent({ category, index }: { category: any, index: any }) {

  const data = await fetchQuery(`${category}/${index}`);

  switch (category) {
    case 'monsters':
      return <MonsterCard monster={data} />;
    case 'spells':
      return <SpellCard spell={data} />;
    // case 'equipment':
    //   return <EquipmentCard equipment={data} />;
    default:
      return <p>404</p>;
  }
}
