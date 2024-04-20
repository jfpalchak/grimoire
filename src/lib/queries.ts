import { notFound } from "next/navigation";

const API_URL = "https://www.dnd5eapi.co/api/";

export async function fetchQuery(query: string) {
  try {
    const response = await fetch(`${API_URL}${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return response.json();
  } catch (error) {
    console.log(`Error fetching '${query}'`, error);
    throw new Error(`Failed to fetch ${query}. ${error}`);
  }
}

export async function getSpell(index: string) {
  try {
    const data = await fetchQuery(`spells/${index}`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}