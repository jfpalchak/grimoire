import type {
  Equipment,
  Weapon,
  Armor,
  Vehicle,
  Tool,
  Gear,
} from '@/types';

export enum Category {
  Weapon  = 'weapon_category',
  Armor   = 'armor_category',
  Vehicle = 'vehicle_category',
  Tool    = 'tool_category',
  Gear    = 'gear_category',
}

export const isWeapon = (equipment: Equipment): equipment is Weapon => {
  return Category.Weapon in equipment;
};

export const isArmor = (equipment: Equipment): equipment is Armor => {
  return Category.Armor in equipment;
};

export const isVehicle = (equipment: Equipment): equipment is Vehicle => {
  return Category.Vehicle in equipment;
};

export const isTool = (equipment: Equipment): equipment is Tool => {
  return Category.Tool in equipment;
};

export const isGear = (equipment: Equipment): equipment is Gear => {
  return Category.Gear in equipment;
};

export const getCategory = (equipment: Equipment) => {
  if (isArmor(equipment)) {
    return equipment[Category.Armor];
  } else if (isWeapon(equipment)) {
    return equipment[Category.Weapon];
  } else if (isVehicle(equipment)) {
    return equipment[Category.Vehicle];
  } else if (isTool(equipment)) {
    return equipment[Category.Tool];
  } else if (isGear(equipment)) {
    return equipment[Category.Gear];
  } else {
    return 'Unknown Category';
  }
};
