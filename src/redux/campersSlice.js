import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Thunk з параметрами: фільтри, сторінка, ліміт
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, filters = {} }, { rejectWithValue }) => {
    try {
      const { location, form, features } = filters;

      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (form) params.append("form", form);
      if (features?.length > 0) {
        features.forEach((feature) => params.append("features", feature));
      }
      params.append("page", page);
      params.append("limit", limit);

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Отримуємо збережені у localStorage обрані кемпери
const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    page: 1,
    hasMore: true,
    filters: {
      location: "",
      form: "",
      features: [],
    },
    favorites: storedFavorites,
  },
  reducers: {
    setLocation(state, action) {
      state.filters.location = action.payload;
    },
    setForm(state, action) {
      state.filters.form = action.payload;
    },
    toggleFeature(state, action) {
      const feature = action.payload;
      if (state.filters.features.includes(feature)) {
        state.filters.features = state.filters.features.filter(
          (f) => f !== feature
        );
      } else {
        state.filters.features.push(feature);
      }
    },
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
    resetFilters(state) {
      state.filters = {
        location: "",
        form: "",
        features: [],
      };
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        state.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setLocation,
  setForm,
  toggleFeature,
  resetCampers,
  incrementPage,
  resetFilters,
  toggleFavorite,
} = campersSlice.actions;

export default campersSlice.reducer;
