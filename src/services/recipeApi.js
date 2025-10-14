import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export async function fetchRecipes(query) {
  try {
    const response = await axios.get(API_URL, {
      params: { s: query },
    });
    return response.data.meals || [];
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
