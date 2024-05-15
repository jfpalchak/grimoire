import type { Reference } from './api-types';
import type { DamageType, DifficultyClass } from './rule-types';

export interface Spell extends Reference {
  desc: string[];
  higher_level?: string[];
  range: string;
  components: string[];
  material?: string;
  area_of_effect?: {
    size: number;
    type: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube';
  };
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  attack_type?: string;
  damage?: DamageType;
  heal_at_slot_level: {
    [level: string]: string;
  };
  dc?: DifficultyClass;
  school: Reference;
  classes: Reference[];
  subclasses?: Reference[];
}