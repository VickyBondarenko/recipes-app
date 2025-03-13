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
    return [...Array(20)]
      .map((_, index) => {
        const ingredient = meal[`strIngredient${index + 1}`];
        const measure = meal[`strMeasure${index + 1}`];
        if (ingredient && ingredient.trim() !== "") {
          return `${ingredient} - ${measure || ""}`;
        }
        return null;
      })
      .filter(Boolean);
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
