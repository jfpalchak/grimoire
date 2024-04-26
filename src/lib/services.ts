import { dnd } from "./api";

export const getSpell = async (index: string): Promise<Spell> => {
  return await dnd.get(`spells/${index}`);
};

export const getMonster = async (index: string): Promise<Monster> => {
  return await dnd.get(`monsters/${index}`);
};

export const getEquipment = async (index: string) => {
  return await dnd.get(`equipment/${index}`);
};
