import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../redux/filtersSlice.js";
import styles from "./FilterPanel.module.css";

// Іконки для обладнання
const equipmentIcons = {
  Radio: "icon-ui-radios",
  Consumption: "icon-fuel-pump",
  Gas: "icon-gas-stove",
  Microwave: "icon-microwave",
  Refrigerator: "icon-fridge",
  AC: "icon-wind",
  Bathroom: "icon-shower",
  Kitchen: "icon-cup-hot",
  TV: "icon-tv",
  Water: "icon-water",
  Transmission: "icon-diagram",
};

// Іконки для типів транспорту
const vehicleTypeIcons = {
  Van: "icon-bi_grid-1x2",
  "Fully Integrated": "icon-bi_grid",
  Alcove: "icon-bi_grid-3x3-gap",
};

const FilterPanel = () => {
  const dispatch = useDispatch();

  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [vehicleType, setVehicleType] = useState(null);
  const [location, setLocation] = useState("");

  // Оновлення фільтрів через Redux
  const handleEquipmentChange = (item) => {
    setSelectedEquipment((prev) => {
      const isSelected = prev.includes(item);
      const updated = isSelected
        ? prev.filter((eq) => eq !== item)
        : [...prev, item];
      dispatch(updateFilters({ selectedEquipment: updated }));
      return updated;
    });
  };

  const handleVehicleTypeChange = (type) => {
    const updatedType = type === vehicleType ? null : type;
    setVehicleType(updatedType);
    dispatch(updateFilters({ vehicleType: updatedType }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    dispatch(updateFilters({ location: value }));
  };

  return (
    <div className={styles.filterPanel}>
      {/* Фільтр за локацією */}
      <div className={styles.filterLocation}>
        <h3>Location</h3>
        <div className={styles.locationInput}>
          <svg className={styles.icon}>
            <use href="/sprite.svg#icon-location" />
          </svg>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {/* Фільтри */}
      <div className={styles.filters}>
        <h3>Filters</h3>

        {/* Фільтр за обладнанням */}
        <div className={styles.filterEquipment}>
          <h4>Vehicle Equipment</h4>
          <ul className={styles.filterEquipmentList}>
            {Object.entries(equipmentIcons).map(([item, icon]) => (
              <li
                key={item}
                onClick={() => handleEquipmentChange(item)}
                className={`${styles.option} ${
                  selectedEquipment.includes(item) ? styles.selected : ""
                }`}
              >
                <div className={styles.iconNameContainer}>
                  <div className={styles.iconContainer}>
                    <svg className={styles.icon}>
                      <use href={`/sprite.svg#${icon}`} />
                    </svg>
                    <span className={styles.iconName}>{item}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Фільтр за типом транспорту */}
        <div className={styles.filterVehicleType}>
          <h4>Vehicle Type</h4>
          <div className={styles.vehicleTypeOptions}>
            {Object.entries(vehicleTypeIcons).map(([type, icon]) => (
              <div
                key={type}
                className={`${styles.option} ${
                  vehicleType === type ? styles.selected : ""
                }`}
                onClick={() => handleVehicleTypeChange(type)}
              >
                <div className={styles.iconNameContainer}>
                  <div className={styles.iconContainer}>
                    <svg className={styles.icon}>
                      <use href={`/sprite.svg#${icon}`} />
                    </svg>
                    <span className={styles.iconName}>{type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопка застосування фільтрів */}
      <button
        className={styles.applyFiltersButton}
        onClick={() =>
          dispatch(updateFilters({ location, selectedEquipment, vehicleType }))
        }
      >
        Search
      </button>
    </div>
  );
};

export default FilterPanel;
