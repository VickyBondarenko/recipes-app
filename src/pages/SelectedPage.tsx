import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { removeFavorite } from "../redux/favoritesSlice/favoritesSlice";

const SelectedPage = () => {
  const dispatch = useDispatch();

  const favoriteRecipes = useSelector(
    (state: RootState) => state.favorites.favoriteRecipes
  );

  const getIngredients = (meal: any) => {
    return Object.keys(meal)
      .filter((key) => key.startsWith("strIngredient") && meal[key]?.trim())
      .map((key) => {
        const index = key.replace("strIngredient", "");
        const measure = meal[`strMeasure${index}`] || "";
        return `${meal[key]} - ${measure}`;
      });
  };

  const allIngredients = favoriteRecipes.reduce((acc: string[], meal) => {
    const ingredients = getIngredients(meal);
    ingredients.forEach((ingredient) => {
      if (ingredient && !acc.includes(ingredient)) {
        acc.push(ingredient);
      }
    });
    return acc;
  }, []);

  const handleRemoveFavorite = (meal: any) => {
    dispatch(removeFavorite(meal));
  };

  return (
    <div>
      <Link to="/" className="back-button">
        <button>Back to recipes</button>
      </Link>
      <h1>Favorite recipes</h1>

      {favoriteRecipes.length === 0 && <p>No favorite recipes.</p>}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          {favoriteRecipes.map((meal) => (
            <div key={meal.idMeal}>
              <Link to={`/recipe/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} width={150} />
                <h2>{meal.strMeal}</h2>
              </Link>
              <button onClick={() => handleRemoveFavorite(meal.idMeal)}>
                Remove from favorites
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>All the ingredients from your favorite recipes:</h3>
          <ul>
            {allIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectedPage;
