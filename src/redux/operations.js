import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Операція для завантаження кемперів з фільтрами та пагінацією
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ location, selectedEquipment, vehicleType, page }) => {
    const response = await axios.get("api/campers", {
      params: {
        location,
        equipment: selectedEquipment.join(","),
        vehicleType,
        page,
        limit: 4,
      },
    });

    return response.data;
  }
);

// Операція для отримання локації за координатами
const GOOGLE_MAPS_API_KEY = "AIzaSyCcpiKBwY8h228Nz-lu7URwoR0CfzT8oiA";
export const getLocationFromCoordinates = createAsyncThunk(
  "campers/getLocationFromCoordinates",
  async (coords) => {
    const { latitude, longitude } = coords;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(geocodeUrl);
    if (response.data.status === "OK") {
      return response.data.results[0].formatted_address;
    } else {
      throw new Error("Geocoding failed");
    }
  }
);
