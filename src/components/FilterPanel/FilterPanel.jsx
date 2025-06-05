import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/campersSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.campers);
  const [, setSearchParams] = useSearchParams();
  const [suggestions, setSuggestions] = useState([]);

  // Автоматичне визначення місцезнаходження
  useEffect(() => {
    if (!filters.location) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const city =
          data.address?.city || data.address?.town || data.address?.village;
        if (city) dispatch(setLocation(city));
      });
    }
  }, []);

  // Синхронізація фільтрів з URL
  useEffect(() => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.features.length > 0)
      params.features = filters.features.join(",");
    setSearchParams(params);
  }, [filters]);

  // Автопідказки міст
  const handleLocationInput = async (e) => {
    const value = e.target.value;
    dispatch(setLocation(value));

    if (value.length < 3) return setSuggestions([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${value}&format=json&limit=5`
    );
    const data = await res.json();
    setSuggestions(data.map((d) => d.display_name));
  };

  const handleFormChange = (e) => {
    dispatch(setForm(e.target.value));
  };

  const handleFeatureToggle = (feature) => {
    dispatch(toggleFeature(feature));
  };

  const handleSuggestionClick = (city) => {
    dispatch(setLocation(city));
    setSuggestions([]);
  };

  return (
    <div className={styles.filterPanel}>
      <h3>Фільтри</h3>

      {/* Локація */}
      <div className={styles.filterGroup}>
        <label>Локація:</label>
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationInput}
          placeholder="Введіть місто..."
        />
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSuggestionClick(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Тип кемпера */}
      <div className={styles.filterGroup}>
        <label>Тип кемпера:</label>
        <select value={filters.form} onChange={handleFormChange}>
          <option value="">Усі</option>
          <option value="van">Фургон</option>
          <option value="alcove">Альков</option>
          <option value="integrated">Інтегрований</option>
        </select>
      </div>

      {/* Особливості */}
      <div className={styles.filterGroup}>
        <label>Особливості:</label>
        <div className={styles.checkboxGroup}>
          {["airConditioner", "kitchen", "tv", "toilet", "shower", "gps"].map(
            (feature) => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                />
                {feature}
              </label>
            )
          )}
        </div>
      </div>

      <button onClick={() => dispatch(resetFilters())}>Скинути фільтри</button>
    </div>
  );
};

export default FilterPanel;
