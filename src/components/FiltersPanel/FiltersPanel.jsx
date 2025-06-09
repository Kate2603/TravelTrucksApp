import React, { useState, useEffect } from "react";
import styles from "./FiltersPanel.module.css";

const VEHICLE_TYPES = [
  { value: "van", label: "Van", icon: "icon-bi_grid-1x2" },
  { value: "fullyIntegrated", label: "Fully Integrated", icon: "icon-bi_grid" },
  { value: "alcove", label: "Alcove", icon: "icon-bi_grid-3x3-gap" },
];

const FEATURES = [
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

const FiltersPanel = ({ filters, onFilterChange }) => {
  const [localLocation, setLocalLocation] = useState(filters.location || "");
  const [localForm, setLocalForm] = useState(filters.form || "");
  const [localFeatures, setLocalFeatures] = useState(filters.features || []);

  // Синхронізація локальних фільтрів з props
  useEffect(() => {
    setLocalLocation(filters.location || "");
    setLocalForm(filters.form || "");
    setLocalFeatures(filters.features || []);
  }, [filters.location, filters.form, filters.features]);

  // Замінимо автоматичне оновлення на ручне через кнопку Search
  // useEffect видаляємо, щоб не оновлювалося на кожну зміну

  const toggleFeature = featureKey => {
    setLocalFeatures(prev =>
      prev.includes(featureKey)
        ? prev.filter(f => f !== featureKey)
        : [...prev, featureKey]
    );
  };

  const resetFilters = () => {
    setLocalLocation("");
    setLocalForm("");
    setLocalFeatures([]);
    onFilterChange({ location: "", form: "", features: [] }); // Скидаємо зовнішні фільтри теж
  };

  // Ось функція, яка викликається при натисканні кнопки Search
  const searchFilters = () => {
    onFilterChange({
      location: localLocation.trim(),
      form: localForm,
      features: localFeatures,
    });
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
          autoComplete="off"
        />
      </div>

      <h2 className={styles.title}>Filters</h2>

      <div className={styles.section}>
        <h2 className={styles.heading}>Vehicle Equipment</h2>
        <div className={styles.features}>
          {FEATURES.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              className={`${styles.featureBtn} ${
                localFeatures.includes(key) ? styles.active : ""
              }`}
              onClick={() => toggleFeature(key)}
              aria-pressed={localFeatures.includes(key)}
            >
              <svg className={styles.featureIcon} aria-hidden="true">
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
              type="button"
              className={`${styles.vehicleBtn} ${
                localForm === value ? styles.active : ""
              }`}
              onClick={() =>
                setLocalForm(prev => (prev === value ? "" : value))
              }
              aria-pressed={localForm === value}
            >
              <svg className={styles.vehicleIcon} aria-hidden="true">
                <use href={`/sprite.svg#${icon}`} />
              </svg>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.searchButton}
          onClick={searchFilters}
        >
          Search
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default FiltersPanel;
