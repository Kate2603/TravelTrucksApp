import { toggleFavorite } from "./favoritesSlice";

export const favoritesMiddleware = store => next => action => {
  const result = next(action);

  if (action.type === toggleFavorite.type) {
    const state = store.getState();
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  }

  return result;
};
