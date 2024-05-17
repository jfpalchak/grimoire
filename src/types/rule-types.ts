import type { Reference } from './api-types';

export interface Rules extends Omit<Reference, 'level'> {
  desc: string;
  subsections: Reference[];
}

export interface RulesSubsection extends Omit<Rules, 'subsections'> {}

export interface RulesChapter {
  rules: Rules;
  sections: RulesSubsection[];
}

export type Alignment = (
  'chaotic neutral' |
  'chaotic evil' |
  'chaotic good' |
  'lawful neutral' |
  'lawful evil' |
  'lawful good' |
  'neutral' |
  'neutral evil' |
  'neutral good' |
  'any alignment' |
  'unaligned'
);

export type UsageType = {
  type: string;
  times?: number;
  dice?: string;
  min_value?: number;
};

export type DifficultyClass = {
  dc_type: Reference;
  dc_value: number;
  dc_success?: string;
  success_type?: string;
};

export type DamageDice = Record<string, string>;

export type DamageType = {
  damage_dice: string;
  damage_type: Reference;
  damage_at_slot_level?: DamageDice;
  damage_at_character_level?: DamageDice;
  [dmgLvl: string]: DamageDice | Reference | string | undefined;
};

export type Action = {
  name: string;
  desc: string;
  dc?: DifficultyClass;
  usage?: UsageType;
  damage?: DamageType[];
  attack_bonus?: number;
  actions?: {
    action_name?: string;
    count?: number;
    type?: 'melee' | 'ranged' | 'ability' | 'magic';
  }[];
};
