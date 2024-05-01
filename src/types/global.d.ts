// Type definitions for Grimoire & the DND 5e SRD API

export {}

declare global {

  type Reference = {
    index: string;
    name: string;
    url: string;
    level?: number;
  };

  type APIResponse = {
    count: number;
    results: Reference[];
  }

  type Alignment = (
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

  type DifficultyClass = {
    dc_type: Reference;
    dc_value: number;
    dc_success?: string;
    success_type?: string;
  };

  type Action = {
    name: string;
    desc: string;
    dc?: DifficultyClass;
    usage?: {
      type: string;
      times?: number;
      dice?: string;
      min_value?: number;
    };
    damage?: {
      damage_dice?: string;
      damage_type?: Reference;
    }[];
    attack_bonus?: number;
    actions?: {
      action_name?: string;
      count?: number;
      type?: 'melee' | 'ranged' | 'ability' | 'magic';
    }[];
  };

  type UsageType = {
    type: string;
    times?: number;
    dice?: string;
    min_value?: number;
  };

  interface Spell {
    index: string;
    name: string;
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
    level: number;
    damage?: {
        damage_type: Reference;
        [damageLevel: string]: {
          [level: string]: string;
        }
        damage_at_slot_level?: {
            [level: string]: string;
        };
        damage_at_character_level?: {
          [level: string]: string;
        }
    };
    heal_at_slot_level: {
      [level: string]: string;
    };
    dc?: DifficultyClass;
    school: Reference;
    classes: Reference[];
    subclasses?: Reference[];
    url: string;
}

interface Monster {
  index: string;
  level?: number;
  name: string;
  url: string;
  desc?: string[];
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

interface Equipment {

}

}