import { API_URL } from "@/config";

export const fetchData = async (query: string) => {
  try {
    const res = await fetch(`${API_URL}${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Network response not OK. Status: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log(`Error fetching '${query}':`, error);
  }
};

export const dndRest = {
  get: fetchData,
};