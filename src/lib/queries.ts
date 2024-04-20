import { notFound } from "next/navigation";

export async function fetchCategory(category: string) {

  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/${category}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      notFound();
    }
    
    return await response.json();
  } catch (error) {
    console.log(`Error fetching '${category}'`, error);
    throw new Error(`Failed to fetch category: ${category}.`);
  }
}

export async function fetchCategoryIndex(category: string, index: string) {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/${category}/${index}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      notFound();
    }
    
    return await response.json();
  } catch (error) {
    console.log(`Error fetching '${index}'`, error);
    throw new Error(`Failed to fetch index: ${category}/${index}.`);
  }
}