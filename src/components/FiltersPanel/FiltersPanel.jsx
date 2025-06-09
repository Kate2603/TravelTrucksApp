import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import styles from "./FiltersPanel.module.css";

const Forms = ["panelTruck", "fullyIntegrated", "alcove"];
const Features = ["airConditioner", "kitchen", "TV", "shower"];

const FiltersPanel = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { location, form, features } = useSelector(state => state.filters);

  // Локальний стан для контролю debounce вводу локації
  const [localLocation, setLocalLocation] = useState(location);

  // Дебаунс оновлення location у Redux
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localLocation !== location) {
        dispatch(setLocation(localLocation));
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [localLocation, dispatch, location]);

  useEffect(() => {
    onFilterChange({ location, form, features });
  }, [location, form, features, onFilterChange]);

  const handleFormChange = selectedForm => {
    dispatch(setForm(selectedForm === form ? "" : selectedForm));
  };

  const handleFeatureToggle = feature => {
    dispatch(toggleFeature(feature));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Filters</h2>

      <div className={styles.section}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <input
          id="location"
          type="text"
          value={localLocation}
          onChange={e => setLocalLocation(e.target.value)}
          placeholder="Enter location"
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Vehicle Type</p>
        <div className={styles.options}>
          {Forms.map(item => (
            <button
              key={item}
              className={`${styles.option} ${form === item ? styles.active : ""}`}
              onClick={() => handleFormChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Features</p>
        <div className={styles.features}>
          {Features.map(feature => (
            <label key={feature} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={features.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </aside>
  );
};

export default FiltersPanel;
