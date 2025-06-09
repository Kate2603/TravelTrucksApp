import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import styles from "./FiltersPanel.module.css";

const VEHICLE_TYPES = [
  { value: "van", label: "Van", icon: "icon-bi_grid-1x2" },
  { value: "fullyIntegrated", label: "Fully Integrated", icon: "icon-bi_grid" },
  { value: "alcove", label: "Alcove", icon: "icon-bi_grid-3x3-gap" },
];

const FEATURES = [
  { key: "location", label: "Location", icon: "icon-location" },
  { key: "airConditioner", label: "AC", icon: "icon-wind" },
  { key: "kitchen", label: "Kitchen", icon: "icon-cup-hot" },
  { key: "tv", label: "TV", icon: "icon-tv" },
  { key: "bathroom", label: "Bathroom", icon: "icon-shower" },
  { key: "radio", label: "Radio", icon: "icon-ui-radios" },
  { key: "refrigerator", label: "Fridge", icon: "icon-fridge" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "gasStove", label: "Gas Stove", icon: "icon-gas-stove" },
  { key: "water", label: "Water", icon: "ion_water-outline" },
];

const FiltersPanel = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { location, form, features } = useSelector(state => state.filters);

  // локальні фільтри — НЕ в redux
  const [localLocation, setLocalLocation] = useState(location);
  const [localForm, setLocalForm] = useState(form);
  const [localFeatures, setLocalFeatures] = useState(features);

  // при кліку на Search
  const handleSearch = () => {
    dispatch(setLocation(localLocation));
    dispatch(setForm(localForm));
    // очистити й заново активувати обрані features
    dispatch(resetFilters());
    if (localForm) dispatch(setForm(localForm));
    if (localLocation) dispatch(setLocation(localLocation));
    localFeatures.forEach(f => dispatch(toggleFeature(f)));

    // викликаємо зміну каталогу
    onFilterChange({
      location: localLocation,
      form: localForm,
      features: localFeatures,
    });
  };

  // при кліку на Reset
  const handleReset = () => {
    dispatch(resetFilters());
    setLocalLocation("");
    setLocalForm("");
    setLocalFeatures([]);

    // Повністю скинути фільтри
    onFilterChange({
      location: "",
      form: "",
      features: [],
    });
  };

  const toggleLocalFeature = featureKey => {
    setLocalFeatures(prev =>
      prev.includes(featureKey)
        ? prev.filter(f => f !== featureKey)
        : [...prev, featureKey]
    );
  };

  return (
    <aside className={styles.panel}>
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

      <h2 className={styles.title}>Filters</h2>

      <div className={styles.section}>
        <h2 className={styles.heading}>Vehicle Equipment</h2>
        <div className={styles.features}>
          {FEATURES.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.featureBtn} ${localFeatures.includes(key) ? styles.active : ""}`}
              onClick={() => toggleLocalFeature(key)}
              type="button"
            >
              <svg className={styles.featureIcon}>
                <use href={`/sprite.svg#${icon}`} />
              </svg>
              <span className={styles.featureLabel}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Vehicle Type</h2>
        <div className={styles.vehicleTypes}>
          {VEHICLE_TYPES.map(({ value, label, icon }) => (
            <button
              key={value}
              className={`${styles.vehicleBtn} ${localForm === value ? styles.active : ""}`}
              onClick={() =>
                setLocalForm(prev => (prev === value ? "" : value))
              }
              type="button"
            >
              <svg className={styles.vehicleIcon}>
                <use href={`/sprite.svg#${icon}`} />
              </svg>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </aside>
  );
};

export default FiltersPanel;
