import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./campersThunks";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
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

export const { resetCampers, incrementPage } = campersSlice.actions;

export const selectIsLoading = state => state.campers.status === "loading";

export default campersSlice.reducer;
