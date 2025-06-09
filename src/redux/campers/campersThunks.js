import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Фетчимо кемпери
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/campers");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Фетчимо одного кемпера за id
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Фетчимо список міст для автодоповнення
export const fetchCities = createAsyncThunk(
  "campers/fetchCities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/cities");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
