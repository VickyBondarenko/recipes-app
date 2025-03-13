import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

// export const getMeals = async (search: string) => {
//   const { data } = await axios.get(`${API_URL}search.php?s=${search}`);
//   return data.meals || [];
// };

export const getAllCategoryList = async () => {
  const { data } = await axios.get(`${API_URL}list.php?c=list`);
  return data.meals || [];
};

export const getMealsByCategory = async (category: string) => {
  const response = await axios.get(`${API_URL}filter.php?c=${category}`);
  return response.data.meals || [];
};

export const getMealsBySearch = async (search: string) => {
  const response = await axios.get(`${API_URL}search.php?s=${search}`);
  return response.data.meals || [];
};

export const getMeals = async () => {
  const categories = await getAllCategoryList();
  const allMeals = [];

  for (const category of categories) {
    const meals = await getMealsByCategory(category.strCategory);
    allMeals.push(...meals);
  }

  return allMeals;
};

export const getMealDetails = async (mealId: string) => {
  const { data } = await axios.get(`${API_URL}lookup.php?i=${mealId}`);
  if (data.meals) {
    const meal = data.meals[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    return { ...meal, ingredients };
  }
  return null;
};
