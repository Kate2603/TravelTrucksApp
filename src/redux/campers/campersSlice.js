import { createSlice } from "@reduxjs/toolkit";
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
  },
  extraReducers: builder => {
    builder
      // Завантаження списку кемперів
      .addCase(fetchCampers.pending, state => {
        state.isLoading = true;
        state.items = [];
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        // Додаємо нові кемпери до існуючих (для пагінації)
        state.items = state.items.concat(action.payload);
        // Якщо даних немає, припиняємо пагінацію
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Завантаження конкретного кемпера по id
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

      // Завантаження міст для автодоповнення
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

// Експорт ред’юсерів
export const { resetCampers, incrementPage } = campersSlice.actions;

// Селектор для фільтрації кемперів за фільтрами з state.filters
export const selectFilteredCampers = state => {
  const campers = state.campers.items || [];
  const filters = state.filters || { location: "", form: "", features: [] };

  return campers.filter(camper => {
    // Перевірка локації (порожній фільтр = всі)
    if (filters.location && camper.location !== filters.location) {
      return false;
    }
    // Перевірка форми
    if (filters.form && camper.form !== filters.form) {
      return false;
    }
    // Перевірка фіч (features - масив рядків)
    const camperFeatures = Array.isArray(camper.features)
      ? camper.features
      : [];
    if (filters.features.length > 0) {
      for (const feature of filters.features) {
        if (!camperFeatures.includes(feature)) {
          return false;
        }
      }
    }
    return true;
  });
};

export const selectIsLoading = state => state.campers.isLoading;
export default campersSlice.reducer;
export { fetchCampers, fetchCamperById, fetchCities };
