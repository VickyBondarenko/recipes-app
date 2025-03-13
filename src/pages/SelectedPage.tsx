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
      <h1>Улюблені рецепти</h1>

      {favoriteRecipes.length === 0 && <p>Немає улюблених рецептів.</p>}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          {favoriteRecipes.map((meal) => (
            <div key={meal.idMeal}>
              <Link to={`/recipe/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} width={150} />
                <h2>{meal.strMeal}</h2>
              </Link>
              <button onClick={() => handleRemoveFavorite(meal.idMeal)}>
                Видалити з улюблених
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Усі інгредієнти з улюблених рецептів:</h3>
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
