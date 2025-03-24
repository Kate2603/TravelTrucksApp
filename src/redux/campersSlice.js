import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API для кемперів
const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Технічний thunk для отримання кемперів
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async () => {
    const response = await axios.get(API_URL);
    return response.data; // Повертаємо дані кемперів
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    locationFilter: "",
    userLocation: "",
  },
  reducers: {
    setLocationFilter(state, action) {
      state.locationFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setLocationFilter } = campersSlice.actions;

// Селектор для відфільтрованих кемперів
export const filteredCampers = (state) => {
  if (state.campers.locationFilter) {
    return state.campers.items.filter((camper) =>
      camper.location
        .toLowerCase()
        .includes(state.campers.locationFilter.toLowerCase())
    );
  }
  return state.campers.items;
};

export default campersSlice.reducer;
