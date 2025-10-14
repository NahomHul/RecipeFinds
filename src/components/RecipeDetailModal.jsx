export default function RecipeDetailModal({ recipe, onClose }) {
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure || ""} ${ing}`.trim());
    }
  }

  if (!recipe.strMeal || !recipe.strInstructions || ingredients.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✖
          </button>
          <p className="text-red-500">This recipe is missing required information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-6 overflow-y-auto z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-2">{recipe.strMeal}</h2>
        <p className="text-gray-600 mb-4">
          {recipe.strCategory} • {recipe.strArea}
        </p>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded mb-6"
        />

        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <p className="whitespace-pre-line text-gray-700 mb-4">
          {recipe.strInstructions}
        </p>

        {recipe.strYoutube && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Video Tutorial</h3>
            <iframe
              className="w-full h-64"
              src={recipe.strYoutube.replace("watch?v=", "embed/")}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {recipe.strSource && (
          <a
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primaryBlue hover:underline"
          >
            View original source →
          </a>
        )}
      </div>
    </div>
  );
}
