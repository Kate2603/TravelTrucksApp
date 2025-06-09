import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById, fetchCities } from "./campersThunks";

const initialState = {
  items: [],
  currentCamper: null,
  cities: [],
  status: "idle",
  isLoading: false,
  error: null,
  total: 0,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetCampers: state => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.total = 0;
    },
    setCurrentCamper: (state, action) => {
      state.currentCamper = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = [
          ...state.items,
          ...action.payload.items.filter(
            newCamper =>
              !state.items.some(existing => existing.id === newCamper.id)
          ),
        ];
        state.total = action.payload.total;
        state.status = "succeeded";
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCamperById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.currentCamper = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCities.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// --- Додатковий селектор для фільтрованих кемперів (як приклад)
export const selectFilteredCampers = state => {
  // Поки що просто повертаємо всі кемпери
  return state.campers.items;
};

export const { resetCampers, setCurrentCamper } = campersSlice.actions;
export default campersSlice.reducer;
