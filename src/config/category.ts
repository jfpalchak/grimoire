import {
  GET_ALL_EQUIPMENT,
  GET_ALL_MAGIC_ITEMS,
  GET_ALL_MONSTERS,
  GET_ALL_SPELLS,
} from '@/lib/graphql/queries';

import SpellCard from '@/components/spells/spell-card';
import MonsterCard from '@/components/monsters/monster-card';
import EquipmentCard from '@/components/equipment/equipment-card';
import MagicItemCard from '@/components/equipment/magic-item-card';

import { SpellItem } from '@/components/spells/spell-list';
import { MonsterItem } from '@/components/monsters/monster-list';
import { EquipmentItem } from '@/components/equipment/equipment-list';
import { MagicItemItem } from '@/components/equipment/magic-item-list';

export type Category = 'spells' | 'monsters' | 'equipment' | 'magic-items';

const categoryConfig = {
  'spells': {
    query: GET_ALL_SPELLS,
    item: SpellItem,
    card: SpellCard,
  },
  'monsters': {
    query: GET_ALL_MONSTERS,
    item: MonsterItem,
    card: MonsterCard,
  },
  'equipment': {
    query: GET_ALL_EQUIPMENT,
    item: EquipmentItem,
    card: EquipmentCard,
  },
  'magic-items': {
    query: GET_ALL_MAGIC_ITEMS,
    item: MagicItemItem,
    card: MagicItemCard,
  },
};

export const getCategoryConfig = (category: string) => {
  const config = categoryConfig[category as Category];

  if (!config) {
    throw new Error(`Unknown category: ${category}`);
  }

  return config;
};

export const getDynamicRoutes = () => {
  return Object.keys(categoryConfig);
};

export const getDynamicRoutesQueryMap = () => {
  return Object.entries(categoryConfig).map(([route, { query }]) => ({
    route,
    query,
  }));
};

// export const getExploreRoutes = async () => {
// }