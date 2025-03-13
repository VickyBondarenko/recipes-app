import { Link } from "react-router-dom";
import { useMeals } from "../hooks/useMeals";
import CategoryFilter from "../components/CategoryFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addFavorite,
  Meal,
  removeFavorite,
} from "../redux/favoritesSlice/favoritesSlice";
import { getMealDetails } from "../api/mealApi";

const AllRecipesPage = () => {
  const { data: meals, isLoading, error } = useMeals();
  const dispatch = useDispatch();

  const [mealsRendered, setMealsRendered] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const favoriteRecipes = useSelector(
    (state: RootState) => state.favorites.favoriteRecipes
  );

  useEffect(() => {
    if (meals && meals.length > 0) {
      setMealsRendered(meals);
    }
  }, [meals]);

  const handleToggleFavorite = async (mealId: string) => {
    const existingRecipe = favoriteRecipes.find((r) => r.idMeal === mealId);

    if (existingRecipe) {
      dispatch(removeFavorite(mealId));
    } else {
      const mealDetails = await getMealDetails(mealId);
      if (mealDetails) {
        dispatch(addFavorite(mealDetails));
      }
    }
  };

  const isFavorite = (recipeId: string) => {
    return favoriteRecipes.some((r) => r.idMeal === recipeId);
  };

  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = mealsRendered.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(mealsRendered.length / itemsPerPage);

  const pageNumbers =
    totalPages <= 10
      ? [...Array(totalPages)].map((_, index) => index + 1)
      : [1, 2, 3, 4, 5, 6, 7, "...", totalPages];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes!</p>;

  return (
    <div>
      <CategoryFilter setMeals={setMealsRendered} />
      <Link to="/favorites">Go to favorites</Link>
      <h1>Recipes</h1>

      <div>
        {currentMeals.map((meal) => (
          <div key={meal.idMeal}>
            <Link to={`/recipe/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} width={150} />
              <h2>{meal.strMeal}</h2>
              <p>
                {meal.strCategory} - {meal.strArea}
              </p>
            </Link>
            <button onClick={() => handleToggleFavorite(meal.idMeal)}>
              {isFavorite(meal.idMeal)
                ? "Remove from favorites"
                : "Add to favorites"}
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() =>
              paginate(typeof number === "number" ? number : currentPage)
            }
            disabled={typeof number === "string"}
            style={{
              fontWeight: currentPage === number ? "bold" : "normal",
            }}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default AllRecipesPage;
