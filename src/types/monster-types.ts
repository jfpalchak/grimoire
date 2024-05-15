import type { Reference } from './api-types';
import type { Alignment, Action } from './rule-types';

export interface Monster extends Reference {
  desc?: string;
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  strength: number;
  wisdom: number;
  image?: string;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
  speed: {
      walk?: string;
      burrow?: string;
      climb?: string;
      fly?: string;
      swim?: string;
  };
  type: string;
  subtype?: string;
  alignment: Alignment;
  alignments?: Alignment[];
  armor_class: {
      type: string;
      value: number;
      proficiency?: Reference;
      armor?: Reference[];
      spell?: Reference;
      condition?: Reference;
  }[];
  hit_points: number;
  hit_dice?: string;
  hit_points_roll?: string;
  forms?: Reference[];
  special_abilities: Action[];
  actions: Action[];
  legendary_actions: Action[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: Reference[];
  senses?: {
      [sense: string]: string | number;
  };
  languages: string;
  proficiencies: {
    value: number;
    proficiency: Reference;
  }[];
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
}