import { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SearchBox from "./components/SearchBox";
import RecipeTile from "./components/RecipeTile";
import { fetchRecipes } from "./services/recipeApi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

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

  const HomePage = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-primaryBlue">Welcome to FindRecipe</h2>
        <p className="text-gray-600">Discover new recipes and cooking inspiration every day — especially for meat lovers!</p>
      </div>

      <SearchBox onSearchClick={handleRecipeSearch} />

      {loading && <p className="mt-8 text-gray-500">Loading recipes...</p>}
      {!loading && errorMsg && <p className="mt-8 text-red-500">{errorMsg}</p>}
      {!loading && recipeList.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primaryBlue">Search Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {recipeList.map((r) => (
              <RecipeTile key={r.idMeal} recipeInfo={r} />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-semibold mb-4 text-primaryBlue">🔥 Featured Meat Recipes</h3>
        {loading && <p className="text-center text-gray-500">Loading delicious dishes...</p>}
        {!loading && featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {featuredRecipes.map((r) => (
              <RecipeTile key={r.idMeal} recipeInfo={r} />
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-600">No meat recipes found 😢</p>
        )}
      </div>
    </div>
  );

  return (
    <Router>
      <Header user={null} onLogout={() => {}} />
      <main style={{ minHeight: "70vh", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}