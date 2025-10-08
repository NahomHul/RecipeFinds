export default function RecipeTile(props) {
  const recipe = props.recipeInfo || props.recipe;
  const onClickHandler = props.onOpenDetail || props.onClick;

  if (!recipe) return null; 

  const { strMealThumb, strMeal, strCategory, strArea } = recipe;

  if (!strMealThumb) return null; // I only want recipes with images

  return (
    <div
      className="recipe-card cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white"
      onClick={() => onClickHandler && onClickHandler(recipe)}
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800">{strMeal}</h4>
        <p className="text-sm text-gray-500 mt-1">
          {strCategory} • {strArea}
        </p>
      </div>
    </div>
  );
}
