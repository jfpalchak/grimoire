import { API_URL } from "@/config";

export const dnd = {
  get: async (query: string) => {
    try {
      const response = await fetch(`${API_URL}${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response not OK. Status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log(`Error fetching '${query}' :`, error);
    }
  },
};
