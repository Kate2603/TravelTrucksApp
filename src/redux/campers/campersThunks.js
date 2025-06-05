import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (
    { page = 1, limit = 4, location = "", form = "", features = [] },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (form) params.append("form", form);
      if (features.length > 0) params.append("features", features.join(","));
      params.append("page", page);
      params.append("limit", limit);

      const res = await axios.get(`${API_URL}?${params.toString()}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
