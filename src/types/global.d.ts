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

  type Rarity = ('Varies' | 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact');

  type DifficultyClass = {
    dc_type: Reference;
    dc_value: number;
    dc_success?: string;
    success_type?: string;
  };

  type DamageType = {
    damage_dice?: string;
    damage_type?: Reference;
    damage_at_slot_level?: Record<string, string>;
    damage_at_character_level?: Record<string, string>;
    [dmgLvl: string]: { [level: string]: string };
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
    damage?: DamageType[];
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

  interface Spell extends Reference {
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

  interface Monster extends Reference {
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

  type ContentItem = {
    item: Reference;
    quantity: number;
  };

  interface IEquipment extends Reference {
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

  interface Vehicle extends IEquipment {
    [vehicle_category: string]: string;
    speed: {
      quantity: number;
      unit: string;
    };
    capacity: number;
  }

  interface Tool extends IEquipment {
    [tool_category: string]: string;
  }

  interface Gear extends IEquipment {
    [gear_category: string]: Reference;
  }

  interface Weapon extends IEquipment { 
    [weapon_category: string]: string;
    weapon_range: string;
    category_range: string;
    damage: DamageType;
    two_handed_damage: DamageType;
    range: Record<string, number>;
    throw_range: Record<string, number>;
  }

  interface Armor extends IEquipment {
    [armor_category: string]: string;
    armor_class: {
      base: number;
      dex_bonus: boolean;
      max_bonus: number;
    };
    str_minimum: number;
    stealth_disadvantage: boolean;
  }

  type Equipment = Gear | Tool | Vehicle | Weapon | Armor;

  interface MagicItem extends Reference {
    equipment_category: Reference;
    rarity: Record<'name', Rarity>;
    variants: Reference[];
    variant: boolean;
    desc: string[];
  }

  interface Rules extends Omit<Reference, 'level'> {
    desc: string;
    subsections: Reference[];
  }

  interface RulesSubsection extends Omit<Rules, 'subsections'> {}

  interface RulesChapter {
    rules: Rules;
    sections: RulesSubsection[];
  }

}