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
      return true;
    });
  }
);
