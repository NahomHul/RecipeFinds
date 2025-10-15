import { useState, useEffect, useCallback } from "react";
import SearchBox from "./components/SearchBox";
import RecipeTile from "./components/RecipeTile";
import { fetchRecipes } from "./services/recipeApi";

export default function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const meatQueries = ["chicken", "beef", "pork", "lamb"];

  const handleRecipeSearch = useCallback(async (searchText) => {
    if (!searchText.trim()) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const recipes = await fetchRecipes(searchText);
      setRecipeList(recipes);
      if (!recipes || recipes.length === 0) {
        setErrorMsg("No recipes found for your search.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadMeatRecipes = async () => {
      setLoading(true);
      let results = [];
      for (let q of meatQueries) {
        const res = await fetchRecipes(q);
        if (res?.length) results.push(...res.slice(0, 3));
      }
      setFeaturedRecipes(results);
      setLoading(false);
    };

    loadMeatRecipes();
  }, []);

  return (
    <div>
      <SearchBox onSearchClick={handleRecipeSearch} />
      {loading && <p>Loading recipes...</p>}
      {!loading && errorMsg && <p>{errorMsg}</p>}
      {!loading && recipeList.length > 0 && (
        <div>
          <h3>Search Results</h3>
          {recipeList.map((r) => (
            <RecipeTile key={r.idMeal} recipeInfo={r} />
          ))}
        </div>
      )}
      <div>
        <h3>Featured Meat Recipes</h3>
        {loading && <p>Loading featured recipes...</p>}
        {!loading && featuredRecipes.length > 0 && (
          <div>
            {featuredRecipes.map((r) => (
              <RecipeTile key={r.idMeal} recipeInfo={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}