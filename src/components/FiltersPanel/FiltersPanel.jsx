import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/campers/campersThunks";
import styles from "./FiltersPanel.module.css";

src / components / FiltersPanel / FiltersPanel.jsx;

const FiltersPanel = ({ filters = {}, onFiltersChange = () => {} }) => {
  const dispatch = useDispatch();
  const cities = useSelector(state => state?.campers?.cities) || [];
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Безпечне значення поля location
  const locationValue =
    typeof filters.location === "string" ? filters.location : "";

  const handleLocationInput = e => {
    const value = e.target.value || "";
    onFiltersChange({ ...filters, location: value });

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = cities
      .map(city => city?.name || "")
      .filter(cityName => cityName.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = city => {
    onFiltersChange({ ...filters, location: city });
    setSuggestions([]);
  };

  const handleFormChange = e => {
    const formValue = e.target.value || "";
    onFiltersChange({ ...filters, form: formValue });
  };

  // Переконуємось, що features - масив
  const features = Array.isArray(filters.features) ? filters.features : [];

  const handleFeatureToggle = feature => {
    const newFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handleReset = () => {
    onFiltersChange({
      location: "",
      form: "",
      features: [],
    });
    setSuggestions([]);
  };

  return (
    <div className={styles.filterPanel}>
      <h3>Filters</h3>

      <div className={styles.filterGroup}>
        <label htmlFor="location">Location:</label>
        <div className={styles.inputWrapper}>
          <span className={styles.icon}>📍</span>
          <input
            id="location"
            type="text"
            value={locationValue}
            onChange={handleLocationInput}
            placeholder="Enter a city..."
            aria-label="City"
            autoComplete="off"
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

      <div className={styles.filterGroup}>
        <label htmlFor="form">Vehicle type:</label>
        <select
          id="form"
          value={typeof filters.form === "string" ? filters.form : ""}
          onChange={handleFormChange}
        >
          <option value="">All</option>
          <option value="van">Van</option>
          <option value="alcove">Alcove</option>
          <option value="integrated">Integrated</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Features:</label>
        <div className={styles.checkboxGroup}>
          {[
            { id: "AC", label: "AC" },
            { id: "kitchen", label: "Kitchen" },
            { id: "TV", label: "TV" },
            { id: "bathroom", label: "Toilet" },
            { id: "shower", label: "Shower" },
            { id: "GPS", label: "GPS" },
          ].map(({ id, label }) => (
            <label key={id} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={features.includes(id)}
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

export default FiltersPanel;
