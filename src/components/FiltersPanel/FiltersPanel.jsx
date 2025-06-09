import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import { useSearchParams } from "react-router-dom";
import styles from "./FiltersPanel.module.css";

const FilterPanel = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.campers);
  const [, setSearchParams] = useSearchParams();
  const [suggestions, setSuggestions] = useState([]);

  // Geolocation
  useEffect(() => {
    if (!filters.location) {
      navigator.geolocation.getCurrentPosition(async pos => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const city =
          data.address?.city || data.address?.town || data.address?.village;
        if (city) {
          dispatch(setLocation(city));
          onFilterChange?.();
        }
      });
    }
  }, []);

  // URL synchronization
  useEffect(() => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.features.length > 0)
      params.features = filters.features.join(",");
    setSearchParams(params);
  }, [filters]);

  // City autocomplete suggestions
  const handleLocationInput = async e => {
    const value = e.target.value;
    dispatch(setLocation(value));
    onFilterChange?.();

    if (value.length < 3) return setSuggestions([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${value}&format=json&limit=5`
    );
    const data = await res.json();
    setSuggestions(data.map(d => d.display_name));
  };

  const handleSuggestionClick = city => {
    dispatch(setLocation(city));
    setSuggestions([]);
    onFilterChange?.();
  };

  const handleFormChange = e => {
    dispatch(setForm(e.target.value));
    onFilterChange?.();
  };

  const handleFeatureToggle = feature => {
    dispatch(toggleFeature(feature));
    onFilterChange?.();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onFilterChange?.();
  };

  return (
    <div className={styles.filterPanel}>
      <h3>Filters</h3>

      {/* Location */}
      <div className={styles.filterGroup}>
        <label htmlFor="location">Location:</label>
        <div className={styles.inputWrapper}>
          <span className={styles.icon}>📍</span>
          <input
            id="location"
            type="text"
            value={filters.location}
            onChange={handleLocationInput}
            placeholder="Enter a city..."
            aria-label="City"
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
      </div>

      {/* Camper type */}
      <div className={styles.filterGroup}>
        <label htmlFor="form">Vehicle type:</label>
        <div className={styles.selectWrapper}>
          <select id="form" value={filters.form} onChange={handleFormChange}>
            <option value="">All</option>
            <option value="van">Van</option>
            <option value="alcove">Alcove</option>
            <option value="integrated">Integrated</option>
          </select>
        </div>
      </div>

      {/* Features */}
      <div className={styles.filterGroup}>
        <label>Features:</label>
        <div className={styles.checkboxGroup}>
          {[
            { id: "airConditioner", label: "AC" },
            { id: "kitchen", label: "Kitchen" },
            { id: "tv", label: "TV" },
            { id: "toilet", label: "Toilet" },
            { id: "shower", label: "Shower" },
            { id: "gps", label: "GPS" },
          ].map(({ id, label }) => (
            <label key={id} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={filters.features.includes(id)}
                onChange={() => handleFeatureToggle(id)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleReset}>Reset filters</button>
    </div>
  );
};

export default FilterPanel;
