const API_URL = "https://www.dnd5eapi.co/api/";
const headerOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
};

export async function fetchQuery(query: string) {
  try {
    const response = await fetch(`${API_URL}${query}`, headerOptions);

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log(`Error fetching '${query}'`, error);
    throw new Error(`Failed to fetch ${query}. ${error}`);
  }
}

export async function getSpell(index: string) {
  const spell = await fetchQuery(`spells/${index}`);
  return spell;
}

export async function getMonster(index: string) {
  const monster = await fetchQuery(`monsters/${index}`);
  return monster;
}

export async function getEquipment(index: string) {
  const equipment = await fetchQuery(`equipment/${index}`);
  return equipment;
}