import { dndRest } from './fetch';
import type {
  Spell,
  Monster,
  Equipment,
  MagicItem,
} from '@/types';

export const getSpell = async (index: string): Promise<Spell | undefined> => {
  try {
    return await dndRest.get<Spell>(`spells/${index}`);
  } catch (err) {
    console.log('Problem fetching spell: ', err);
  }
};

export const getMonster = async (index: string): Promise<Monster | undefined> => {
  try {
    return await dndRest.get<Monster>(`monsters/${index}`);
  } catch (err) {
    console.log('Problem fetching monster: ', err);
  }
};

export const getEquipment = async (index: string): Promise<Equipment | undefined> => {
  try {
    return await dndRest.get<Equipment>(`equipment/${index}`);
  } catch (err) {
    console.log('Problem fetching equipment: ', err);
  }
};

export const getMagicItem = async (index: string): Promise<MagicItem | undefined> => {
  try {
    return await dndRest.get<MagicItem>(`magic-items/${index}`);
  } catch (err) {
    console.log('Problem fetching magic item: ', err);
  }
};
