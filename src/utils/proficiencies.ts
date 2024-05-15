import type { Reference } from '@/types';

type Proficiency = { 
  value: number;
  proficiency: Reference;
};

type FlatProficiency = {
  type: string;
  stat: string;
  value: number;
  url: string;
};

type ProficiencyData = Omit<FlatProficiency, 'type'>;

// Given an array of proficiency objects, 
// flatten the data, group according to their associated proficiency, and
// return an array containing the key/value pairs for each prof. and its associated monster stats. 
export function proficiencies(array: Proficiency[]): [string, ProficiencyData[]][] {
  const profMap = array.reduce((map, prof) => {
    const { type, ...stats } = flatProf(prof);

    const existing = map.get(type) ?? [];
    map.set(type, [...existing, stats]);
    
    return map;
  }, new Map<string, ProficiencyData[]>());

  return Array.from(profMap);
}

// Get the type of a given proficiency and the name of its associated stat,
// flatten the rest of the data, and
// return an object of the flattened proficiency data.
function flatProf({ value, proficiency }: Proficiency): FlatProficiency {
  const [type, stat] = proficiency.name.split(': ');
  return { type, stat, value, url: proficiency.url };
}
