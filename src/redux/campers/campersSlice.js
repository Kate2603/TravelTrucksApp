import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById, fetchCities } from "./campersThunks";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    status: "idle",
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,
    cities: [],
    filters: {
      location: "",
      form: "",
      features: [],
    },
  },
  reducers: {
    resetCampers: state => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
    incrementPage: state => {
      state.page += 1;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.isLoading = true;
        state.items = [];
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCamperById.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.currentCamper = null;
        state.status = "loading";
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCities.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCampers, incrementPage, setFilters } = campersSlice.actions;

export const selectCampersItems = state => state.campers.items;
export const selectCampersFilters = state => state.campers.filters;

export const selectFilteredCampers = createSelector(
  [selectCampersItems, selectCampersFilters],
  (campers, filters) => {
    return campers.filter(camper => {
      const matchLocation =
        !filters.location ||
        camper.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchForm =
        !filters.form ||
        camper.form.toLowerCase() === filters.form.toLowerCase();

      const matchFeatures =
        !filters.features.length ||
        filters.features.every(feature => camper[feature]);

      return matchLocation && matchForm && matchFeatures;
    });
  }
);

export const selectIsLoading = state => state.campers.isLoading;

export default campersSlice.reducer;
export { fetchCampers, fetchCamperById, fetchCities };
