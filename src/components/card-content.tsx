import React from 'react'
import { notFound } from 'next/navigation';
// import { fetchDND, dnd } from '@/lib/services';
import MonsterCard from './monsters/monster-card';
import SpellCard from './spells/spell-card';
import EquipmentCard from './equipment/equipment-card';

export default async function CardContent({ category, index }: { category: any, index: any }) {

  // const data = await fetchDND(`${category}/${index}`);
  // const data = await dnd.get(`${category}/${index}`);

  switch (category) {
    case 'monsters':
      return <MonsterCard index={index} />;
    case 'spells':
      return <SpellCard index={index} />;
    case 'equipment':
      return <EquipmentCard index={index} />;
    default:
      notFound();
  }
}
