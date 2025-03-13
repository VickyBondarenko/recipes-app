import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealDetails } from "../api/mealApi";

const RecipePage: React.FC = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      const mealData = await getMealDetails(id || "");
      if (mealData) {
        setMeal(mealData);
      }
      setIsLoading(false);
    };

    fetchMeal();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (!meal) return <div>Recipe not found.</div>;

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-button">
        <button>Back to recipes</button>
      </Link>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>
      <p>
        <strong>Instructions:</strong> {meal.strInstructions}
      </p>
      <h3>Ingredients:</h3>
      <ul>
        {meal.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
