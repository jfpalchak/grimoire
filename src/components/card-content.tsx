import { fetchCategoryIndex } from '@/lib/queries';
import React from 'react'
import MonsterCard from './monster-card';
import SpellCard from './spell-card';
import { notFound } from 'next/navigation';

export default async function CardContent({ category, index }: { category: any, index: any }) {

  const data = await fetchCategoryIndex(category, index);

  switch (category) {
    case 'monsters':
      return <MonsterCard monster={data} />;
    case 'spells':
      return <SpellCard spell={data} />;
    // case 'equipment':
    //   return <EquipmentCard equipment={data} />;
    default:
      return <p>Whoops.</p>;
  }
}
