import { createSelector } from "reselect";

// Селектори для отримання даних з Redux
export const selectCampers = (state) => state.campers.items; // Всі кемпери
export const selectLoading = (state) => state.campers.isLoading; // Статус завантаження
export const selectFilters = (state) => state.filters; // Фільтри

// Створення мемоізованого селектора для відфільтрованих кемперів
export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    return campers.filter((camper) => {
      const matchesType =
        !filters.vehicleType ||
        (typeof filters.vehicleType === "string" &&
          camper.type === filters.vehicleType);

      const matchesEquipment =
        !filters.selectedEquipment ||
        (Array.isArray(filters.selectedEquipment) &&
          filters.selectedEquipment.every((item) =>
            camper.equipment.includes(item)
          ));

      const matchesLocation =
        !filters.location ||
        (typeof filters.location === "string" &&
          camper.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()));

      return matchesType && matchesEquipment && matchesLocation;
    });
  }
);
