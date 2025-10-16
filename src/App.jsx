import { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";
import RecipeTile from "./components/RecipeTile";
import RecipeDetailModal from "./components/RecipeDetailModal";
import { fetchRecipes } from "./services/recipeApi";
import { authService } from "./services/authService";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [user, setUser] = useState(authService.getCurrentUser());

  // Logout handler
  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  // useCallback prevents unnecessary recreation of the function
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

  // Recipes Page (protected route)
  const RecipesPage = () => (
    <div className="page-wrapper bg-offwhite min-h-screen flex flex-col items-center py-14 px-4">
      <h1 className="main-heading text-4xl font-extrabold text-primaryBlue">
        🍲 Recipe Finder (MealDB)
      </h1>
      <p className="tagline-text mt-2 text-darkGray">
        Find meals by name and discover new dishes
      </p>

      <SearchBox onSearchClick={handleRecipeSearch} />

      {loading && <p className="mt-8 text-gray-500">Loading recipes...</p>}
      {!loading && errorMsg && <p className="mt-8 text-red-500">{errorMsg}</p>}

      {!loading && recipeList.length > 0 && (
        <div className="recipe-grid mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {recipeList.map((r) => (
            <RecipeTile
              key={r.idMeal}
              recipeInfo={r}
              onOpenDetail={setSelectedRecipe}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );

  // PrivateRoute component (auth-protected wrapper)
  const PrivateRoute = ({ children }) => {
    const currentUser = authService.getCurrentUser();
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <main style={{ minHeight: "70vh", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <RecipesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={(u) => {
                  setUser(u);
                }}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}