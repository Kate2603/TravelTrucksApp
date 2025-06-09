import { createSelector } from "@reduxjs/toolkit";

const selectCampers = state => state.campers.items || [];
const selectFilters = state =>
  state.filters || { search: "", location: "", form: "", features: [] };

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    return campers.filter(camper => {
      // Пошук за назвою (якщо заданий пошук)
      if (
        filters.search &&
        !camper.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Фільтр по локації
      if (filters.location && camper.location !== filters.location) {
        return false;
      }
      // Фільтр по формі кемпера
      if (filters.form && camper.form !== filters.form) {
        return false;
      }
      // Фільтрація за фічами
      if (filters.features.length > 0) {
        const camperFeatures = Array.isArray(camper.features)
          ? camper.features
          : [];
        for (const feature of filters.features) {
          if (!camperFeatures.includes(feature)) {
            return false;
          }
        }
      }
      return true;
    });
  }
);
