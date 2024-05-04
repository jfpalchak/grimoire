import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Remove the '/api' portion of a given url string.
export function shortUrl(url: string): string {
  return url.substring(4);
}

// Format an array of markdown text to properly render on the DOM.
export function formatMD(text: string[]): string {
  return text.reduce((article, row, i) => {
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

// Calculate the modifier of a given ability score;
// Possible modifiers range from -5 to +10.
export function modifier(score: number): number {
  if (score <= 1) {
    return -5;
  } else if (score >= 30) {
    return 10;
  } else {
    return Math.floor((score - 10) / 2);
  }
}

type Proficiency = { 
  value: number;
  proficiency: Reference;
}

type FlatProficiency = {
  type: string;
  stat: string;
  value: number;
  url: string;
}

export type ProficiencyData = Omit<FlatProficiency, 'type'>;

// Get the type of a given proficiency and the name of its associated stat,
// return an object of the flattened proficiency data.
function flatProf({ value, proficiency }: Proficiency): FlatProficiency {
  const [type, stat] = proficiency.name.split(': ');
  return { type, stat, value, url: proficiency.url };
}

// Given an array of proficiency objects, 
// flatten the data, group according to their associated proficiency, and
// return an array containing key/value pairs for each prof. and its associated stats. 
export function proficiencies(array: Proficiency[]): [string, ProficiencyData[]][] {
  const profMap = array.reduce((map, prof) => {
    const { type, ...stats } = flatProf(prof);

    const existing = map.get(type) ?? [];
    map.set(type, [...existing, stats]);

    return map;
  }, new Map<string, ProficiencyData[]>());

  return Array.from(profMap);
}


export function formatActionMD(action: Action) {
  return `***${action.name + formatUsage(action.usage)}*** ${action.desc.replaceAll('\n', '\n\n')}`;
}

export function formatUsage(usage?: UsageType): string {
  if (!usage) return '.';

  switch(usage.type) {
    case 'per day':
      return ' ' + `(${usage.times} ${usage.type}).`;
    case 'recharge on roll':
      return ' ' + `(${usage.type}, ${usage.min_value}+ on ${usage.dice}).`;
    default:
      return '!'; // ! = testing // prod = '.'
  }
}
