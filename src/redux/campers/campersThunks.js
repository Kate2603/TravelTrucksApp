import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базовий URL для всіх запитів
axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

// Фетчимо кемпери з фільтрами
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
      );
      if (!response.ok) {
        return rejectWithValue("Помилка сервера: " + response.status);
      }
      const data = await response.json();

      // Перевірка формату відповіді
      if (
        !data ||
        typeof data !== "object" ||
        !Array.isArray(data.items) ||
        typeof data.total !== "number"
      ) {
        return rejectWithValue("Невірний формат відповіді");
      }

      return data; // повертаємо обʼєкт { total, items: [...] }
    } catch (error) {
      return rejectWithValue(error.message || "Невідома помилка при запиті");
    }
  }
);

// Фетчимо одного кемпера за ID
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      console.error("fetchCamperById error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Фетчимо список міст (якщо потрібен окремий endpoint)
export const fetchCities = createAsyncThunk(
  "campers/fetchCities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/cities");
      return response.data;
    } catch (error) {
      console.error("fetchCities error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
