import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: [],
    search: "",
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    toggleFeature(state, action) {
      const feature = action.payload;
      if (state.features.includes(feature)) {
        state.features = state.features.filter(f => f !== feature);
      } else {
        state.features.push(feature);
      }
    },
    resetFilters() {
      return {
        location: "",
        form: "",
        features: [],
        search: "",
      };
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
  setSearch,
  setFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
