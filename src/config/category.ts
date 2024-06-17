import {
  GET_ALL_EQUIPMENT,
  GET_ALL_MAGIC_ITEMS,
  GET_ALL_MONSTERS,
  GET_ALL_SPELLS,
} from '@/lib/graphql/queries';

import { SpellCard, SpellItem } from '@/components/spells';
import { MonsterCard, MonsterItem } from '@/components/monsters';
import { EquipmentCard, EquipmentItem } from '@/components/equipment';
import { MagicItemCard, MagicItemItem } from '@/components/magic-items';

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

export const getCategoryRoutes = () => {
  return Object.keys(categoryConfig);
};

// export const getCategoryRoutesQueryMap = () => {
//   return Object.entries(categoryConfig).map(([route, { query }]) => ({
//     route,
//     query,
//   }));
// };
