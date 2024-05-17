import React from 'react'
import { notFound } from 'next/navigation';

import MonsterCard from './monsters/monster-card';
import SpellCard from './spells/spell-card';
import EquipmentCard from './equipment/equipment-card';
import MagicItemCard from './equipment/magic-item-card';

export default async function CardContent({ category, index }: { category: string, index: string }) {

  switch (category) {
    case 'monsters':
      return <MonsterCard index={index} />;
    case 'spells':
      return <SpellCard index={index} />;
    case 'equipment':
      return <EquipmentCard index={index} />;
    case 'magic-items':
      return <MagicItemCard index={index} />;
    default:
      notFound();
  }
}
