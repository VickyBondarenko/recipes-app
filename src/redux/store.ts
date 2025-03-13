import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice/favoritesSlice";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
