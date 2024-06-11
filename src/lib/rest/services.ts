import { dndRest } from "./fetch";
import { shortUrl } from "@/utils/format";
import type {
  Spell,
  Monster,
  Equipment,
  MagicItem,
  Rules,
  RulesChapter,
  RulesSubsection,
} from "@/types";

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
}

export const getRules = async (index: string): Promise<RulesChapter | undefined> => {
  try {
    const rules = await dndRest.get<Rules>(`rules/${index}`);

    const sectionPromises = rules.subsections.map(({ url }) => dndRest.get<RulesSubsection>(shortUrl(url)));
    const subsections = await Promise.all(sectionPromises);

    return { rules, subsections };
  } catch (error) {
    console.log(`Error getting rules for index ${index}:`, error);
  }
}
