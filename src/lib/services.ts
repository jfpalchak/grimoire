
const API_URL = "https://www.dnd5eapi.co/api/";
const requestOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
};

export async function fetchDND(query: string) {
  try {
    const response = await fetch(`${API_URL}${query}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Network response not OK. Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log(`Error fetching '${query}' :`, error);
  }
}

export async function getSpell(index: string): Promise<Spell> {
  const spell = await fetchDND(`spells/${index}`);
  return spell;
}

export async function getMonster(index: string): Promise<Monster> {
  const monster = await fetchDND(`monsters/${index}`);
  return monster;
}

export async function getEquipment(index: string) {
  const equipment = await fetchDND(`equipment/${index}`);
  return equipment;
}

// Create getAll() and get(index) fetch methods for a given category:
function gets<T>(category: string) {
  return {
    getAll: async (): Promise<APIResponse> => await fetchDND(category),
    get: async (index: string): Promise<T> => await fetchDND(`${category}/${index}`),
  }
}

// API object containing query methods for fetching data from the DnD 5e SRD API
const dnd = {
  fetch: async (query: string) => await fetchDND(query),
  monsters: gets<Monster>('monsters'),
  spells: gets<Spell>('spells'),
  equipment: gets<any>('equipment'),
}

export { dnd };