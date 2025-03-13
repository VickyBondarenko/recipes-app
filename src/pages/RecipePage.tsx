import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealDetails } from "../api/mealApi"; // Використовуємо існуючу функцію

const RecipePage: React.FC = () => {
  const { id } = useParams(); // Отримуємо id рецепту з URL
  const [meal, setMeal] = useState<any>(null); // Стан для збереження рецепту
  const [isLoading, setIsLoading] = useState(true); // Стан для індикації завантаження

  useEffect(() => {
    const fetchMeal = async () => {
      // Отримуємо дані рецепту за допомогою функції getMealDetails
      const mealData = await getMealDetails(id || ""); // Перевіряємо, чи є id
      if (mealData) {
        setMeal(mealData); // Оновлюємо стан рецепту
      }
      setIsLoading(false); // Завершуємо процес завантаження
    };

    fetchMeal(); // Викликаємо функцію для отримання даних
  }, [id]); // Перезавантажуємо запит при зміні id

  if (isLoading) return <div>Loading...</div>; // Показуємо індикатор завантаження, поки дані не завантажились

  if (!meal) return <div>Recipe not found.</div>; // Якщо рецепт не знайдений

  return (
    <div className="recipe-detail">
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
          <li key={index}>{ingredient}</li> // Виводимо інгредієнти, які містяться в meal.ingredients
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
