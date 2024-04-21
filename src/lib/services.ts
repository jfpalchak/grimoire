import { notFound } from "next/navigation";

const API_URL = "https://www.dnd5eapi.co/api/";
const headerOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
};

export async function fetchDND(query: string) {
  try {
    const response = await fetch(`${API_URL}${query}`, headerOptions);

    if (!response.ok) {
      throw new Error(`Network response not OK. Status: ${response.status}`);
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