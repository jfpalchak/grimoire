import { dnd } from "./api";
import { shortUrl } from "@/utils/format";
import type {
  Spell,
  Monster,
  Equipment,
  Rules,
  RulesChapter,
  RulesSubsection,
} from "@/types";

export const getSpell = async (index: string): Promise<Spell> => {
  return await dnd.get(`spells/${index}`);
};

export const getMonster = async (index: string): Promise<Monster> => {
  return await dnd.get(`monsters/${index}`);
};

export const getEquipment = async (index: string): Promise<Equipment> => {
  return await dnd.get(`equipment/${index}`);
};

export const getRules = async (index: string): Promise<RulesChapter | undefined> => {
  try {
    const rules: Rules = await dnd.get(`rules/${index}`);

    const sectionPromises: Promise<RulesSubsection>[] = rules.subsections.map(({ url }) => dnd.get(shortUrl(url)));
    const sections = await Promise.all(sectionPromises);

    return { rules, sections };
  } catch (error) {
    console.log(`Error getting rules for index ${index}:`, error);
  }
}
