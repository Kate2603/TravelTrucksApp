import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campers/campersSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import filtersReducer from "./filters/filtersSlice";
import uiReducer from "./ui/uiSlice";
import { favoritesMiddleware } from "./favorites/favoritesMiddleware";

let preloadedFavorites = [];
try {
  preloadedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
} catch (err) {
  console.warn("Invalid favorites JSON in localStorage:", err);
}

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(favoritesMiddleware),
  preloadedState: {
    favorites: preloadedFavorites,
  },
});
