import { dnd } from "./api";
import { shortUrl } from "./utils";

export const getSpell = async (index: string): Promise<Spell> => {
  return await dnd.get(`spells/${index}`);
};

export const getMonster = async (index: string): Promise<Monster> => {
  return await dnd.get(`monsters/${index}`);
};

export const getEquipment = async (index: string) => {
  return await dnd.get(`equipment/${index}`);
};

type RulesChapter = {
  rules: Rules;
  sections: RuleSubsection[];
};

export const getRules = async (index: string): Promise<RulesChapter | undefined> => {
  try {
    const rules: Rules = await dnd.get(`rules/${index}`);

    const sectionPromises: Promise<RuleSubsection>[] = rules.subsections.map(({ url }) => dnd.get(shortUrl(url)));
    const sections = await Promise.all(sectionPromises);

    return { rules, sections };
  } catch (error) {
    console.log(`Error getting rules for index ${index}:`, error);
  }
}
