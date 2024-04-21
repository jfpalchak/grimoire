export {}

declare global {

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

  type Reference = {
    index: string;
    name: string;
    url: string;
    level?: number;
  }

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
        damage_at_slot_level: {
            [slotLevel: number]: string;
        };
    };
    dc?: {
        dc_type: Reference;
        dc_success: string;
    };
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
  charisma?: number;
  constitution?: number;
  dexterity?: number;
  intelligence?: number;
  strength?: number;
  wisdom?: number;
  image?: string;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
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
  actions: {
      name?: string;
      desc?: string;
      attack_bonus?: number;
      damage?: {
          damage_dice?: string;
          damage_type?: Reference;
      }[];
      actions?: {
        action_name?: string;
        count?: number;
        type?: 'melee' | 'ranged' | 'ability' | 'magic';
      }[];
  }[];
  special_abilities: {
      name?: string;
      desc?: string;
      dc?: {
          dc_type?: Reference;
          dc_value?: number;
          success_type?: string;
      };
  }[];
  speed?: {
      walk?: string;
      burrow?: string;
      climb?: string;
      fly?: string;
      swim?: string;
  };
  senses?: {
      [sense: string]: string | number;
  };
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: Reference[];
  proficiencies: {
      value: number;
      proficiency: Reference;
  }[];
  legendary_actions: any[];
}


interface Equipment {

}

}