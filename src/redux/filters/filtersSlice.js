import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: [],
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
        state.features = state.features.filter((f) => f !== feature);
      } else {
        state.features.push(feature);
      }
    },
    resetFilters() {
      return {
        location: "",
        form: "",
        features: [],
      };
    },
  },
});

export const { setLocation, setForm, toggleFeature, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
