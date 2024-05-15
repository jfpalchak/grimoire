import type { Reference } from './api-types';
import type { DamageType } from './rule-types';

export type Rarity = ('Varies' | 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact');

export type ContentItem = {
  item: Reference;
  quantity: number;
};

export interface IEquipment extends Reference {
  equipment_category: Reference;
  cost: {
    quantity: number;
    unit: string;
  };
  weight: number;
  contents: ContentItem[];
  properties: Reference[];
  special: string[];
  desc: string[];
}

export interface Vehicle extends IEquipment {
  vehicle_category: string;
  speed: {
    quantity: number;
    unit: string;
  };
  capacity: number;
}

export interface Tool extends IEquipment {
  tool_category: string;
}

export interface Gear extends IEquipment {
  gear_category: Reference;
}

export interface Weapon extends IEquipment { 
  weapon_category: string;
  weapon_range: string;
  category_range: string;
  damage: DamageType;
  two_handed_damage: DamageType;
  range: Record<string, number>;
  throw_range: Record<string, number>;
}

export interface Armor extends IEquipment {
  armor_category: string;
  armor_class: {
    base: number;
    dex_bonus: boolean;
    max_bonus: number;
  };
  str_minimum: number;
  stealth_disadvantage: boolean;
}

export type Equipment = Gear | Tool | Vehicle | Weapon | Armor;

export interface MagicItem extends Reference {
  equipment_category: Reference;
  rarity: Record<'name', Rarity>;
  variants: Reference[];
  variant: boolean;
  desc: string[];
}