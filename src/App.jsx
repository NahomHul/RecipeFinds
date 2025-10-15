import { useState } from "react";
import SearchBox from "./components/SearchBox";
import RecipeTile from "./components/RecipeTile";
import { fetchRecipes } from "./services/recipeApi";

export default function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SearchBox />
      {recipeList.map((r) => (
        <RecipeTile key={r.idMeal} recipeInfo={r} />
      ))}
      <div>
        <h3>Featured Recipes</h3>
        {featuredRecipes.map((r) => (
          <RecipeTile key={r.idMeal} recipeInfo={r} />
        ))}
      </div>
    </div>
  );
}