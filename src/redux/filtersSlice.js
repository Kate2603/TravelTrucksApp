import { createSlice } from "@reduxjs/toolkit";

// Початковий стан фільтрів
const initialState = {
  location: "",
  selectedEquipment: [],
  vehicleType: null,
  transmission: "",
  engine: "",
  priceRange: [null, null],
  rating: null,
  dimensions: {
    length: "",
    width: "",
    height: "",
  },
  tank: "",
  consumption: "",
  features: {
    AC: null,
    kitchen: null,
    bathroom: null,
    radio: null,
    refrigerator: null,
    microwave: null,
    gas: null,
    water: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export const selectFilters = (state) => state.filters;
export default filtersSlice.reducer;
