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

export const getSpell = async (index: string): Promise<Spell> => {
  return await dndRest.get(`spells/${index}`);
};

export const getMonster = async (index: string): Promise<Monster> => {
  return await dndRest.get(`monsters/${index}`);
};

export const getEquipment = async (index: string): Promise<Equipment> => {
  return await dndRest.get(`equipment/${index}`);
};

export const getMagicItem = async (index: string): Promise<MagicItem> => {
  return await dndRest.get(`magic-items/${index}`);
}

export const getRules = async (index: string): Promise<RulesChapter | undefined> => {
  try {
    const rules: Rules = await dndRest.get(`rules/${index}`);

    const sectionPromises: Promise<RulesSubsection>[] = rules.subsections.map(({ url }) => dndRest.get(shortUrl(url)));
    const subsections = await Promise.all(sectionPromises);

    return { rules, subsections };
  } catch (error) {
    console.log(`Error getting rules for index ${index}:`, error);
  }
}
