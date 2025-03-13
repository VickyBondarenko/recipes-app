import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
}

interface FavoritesState {
  favoriteRecipes: Meal[];
}

const initialState: FavoritesState = {
  favoriteRecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Meal>) => {
      const meal = action.payload;

      if (
        !state.favoriteRecipes.find((recipe) => recipe.idMeal === meal.idMeal)
      ) {
        state.favoriteRecipes.push(meal);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
