import { createSelector } from "@reduxjs/toolkit";

const selectCampers = state => state.campers.items;
const selectFilters = state => state.filters;

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    return campers.filter(camper => {
      if (
        filters.search &&
        !camper.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.location && camper.location !== filters.location) {
        return false;
      }
      if (filters.form && camper.form !== filters.form) {
        return false;
      }
      if (filters.features.length > 0) {
        for (const feature of filters.features) {
          if (!camper.features.includes(feature)) {
            return false;
          }
        }
      }
      return true;
    });
  }
);
