import { useState } from "react";
import SearchBox from "./components/SearchBox";
import RecipeTile from "./components/RecipeTile";

export default function App() {
  const [recipeList, setRecipeList] = useState([]);

  return (
    <div>
      <SearchBox />
      {recipeList.map((r) => (
        <RecipeTile key={r.idMeal} recipeInfo={r} />
      ))}
    </div>
  );
}