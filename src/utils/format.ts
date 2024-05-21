import type { Action, UsageType, Monster, Armor } from '@/types';

// Remove the '/api' portion of a given url string.
export function shortUrl(url: string): string {
  return url.substring(4);
}

// Remove all whitespace from a given string.
export function bookmark(string: string): string {
  return string.replace(/\s/g, '');
}

// Format an array of markdown text to properly render on the DOM.
export function formatSpellMD(text: string[]): string {
  return text
    .reduce((article, row, i) => {
      if (row.startsWith('|') && text[i + 1]?.startsWith('|')) {
        return article + row + '\n';
      } else {
        return article + highlight(row) + '\n\n';
      }
    }, '');
}

// If the given string includes details of a saving throw,
// return the string with emphasis (in markdown).
function highlight(row: string): string {
  const regex = /(make.*saving|must.*saving)/;
  const hasSavingThrow = regex.test(row);
  const isNotFormatted = !(row.startsWith('-') || row.startsWith('*'));

  if (hasSavingThrow && isNotFormatted) {
    return '_' + row + '_';
  }

  return row;
}

// Given a monster's action/ability object, 
// return a formatted string containing markdown.
export function formatActionMD(action: Action): string {
  return `***${action.name}${formatUsage(action.usage)}*** ${formatDesc(action.desc)}`;
}

// Given the usage conditions for an action/ability,
// return the data formatted as a string.
function formatUsage(usage?: UsageType): string {
  if (!usage) return '.';

  switch(usage.type) {
    case 'per day':
      return ` (${usage.times} ${usage.type}).`;
    case 'recharge on roll':
      return ` (${usage.type}, ${usage.min_value}+ on ${usage.dice}).`;
    default:
      return '.';
  }
}

// Given a string containing the description of an action/ability,
// format line breaks for markdown, and italicize any instance of Attack/Hit text.
function formatDesc(desc: string): string {
  const regex = /(Melee or Ranged|Ranged|Melee) Weapon Attack:|Hit:/g;

  const formattedDesc = desc.replace(regex, (match) => `_${match}_`)
                            .replaceAll('\n', '\n\n');
  return formattedDesc;
}

type MonsterAC = Monster['armor_class'];

// Given a monster's armor_class property,
// return the object's data formatted as a string.
export function formatMonsterAC(monsterAC: MonsterAC): string {
  return monsterAC
    .map(({ type, value, armor, spell, condition }) => {
      const acConditionOrType = condition 
        ? `while ${condition.name}`
        : type;
      const acSpellOrArmor = spell 
        ? `: ${spell.name}`
        : armor 
        ? `: ${armor.map((a)=>a.name).join(', ')}`
        : '';
      const ac = `${value} (${acConditionOrType}${acSpellOrArmor})`;
      return ac;
    })
    .join(', ');
}

type ArmorAC = Armor['armor_class'];

// Given an equipment's armor_class property,
// return the object's data formatted as a string.
export function formatArmorAC({ base, dex_bonus, max_bonus }: ArmorAC): string {
  return `${base} ${dex_bonus ? '+ Dex modifier' : ''} ${max_bonus ? `(max ${max_bonus})` : ''}`;
}
