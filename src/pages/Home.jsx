import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../services/recipeApi"; 
import RecipeTile from "../components/RecipeTile";
import RecipeDetailModal from "../components/RecipeDetailModal";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Meat-based keywords to fetch, because I love meat
  const meatQueries = ["chicken", "beef", "pork", "lamb"];

  useEffect(() => {
    const loadMeatRecipes = async () => {
      setLoading(true);
      let results = [];
      for (let q of meatQueries) {
        const res = await fetchRecipes(q);
        if (res?.length) results.push(...res.slice(0, 3));
      }
      setRecipes(results);
      setLoading(false);
    };

    loadMeatRecipes();
  }, []);

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Welcome to FindRecipe</h2>
        <p className="text-gray-600">
          Discover new recipes and cooking inspiration every day — especially for meat lovers!
        </p>
      </div>

      {/* Featured Recipes */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">🔥 Featured Meat Recipes</h3>

        {loading ? (
          <p className="text-center">Loading delicious dishes...</p>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
              <RecipeTile
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No meat recipes found 😢</p>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
