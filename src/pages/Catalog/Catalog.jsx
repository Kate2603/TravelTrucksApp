import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import CampersCard from "../../components/CampersCard/CampersCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Catalog.module.css";
import { fetchCampers } from "../../redux/campers/campersThunks";
import { selectFilteredCampers } from "../../redux/campers/campersSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredCampers);
  const isLoading = useSelector(state => state.campers.isLoading);
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    features: [],
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchCampers(filters));
    }, 500); // debounce
    return () => clearTimeout(timeout);
  }, [dispatch, filters]);

  const handleFilterChange = useCallback(newFilters => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);

  return (
    <div className={styles.catalogPage}>
      <div className={styles.filtersWrapper}>
        <FiltersPanel onFilterChange={handleFilterChange} />
      </div>

      <div className={styles.catalogListWrapper}>
        {isLoading && <Loader />}

        {!isLoading && Array.isArray(campers) && campers.length > 0 && (
          <div className={styles.catalogList}>
            {campers.slice(0, 4).map(camper => (
              <CampersCard
                key={`${camper.id}-${camper.name}`}
                camper={camper}
                className={styles.catalogItem}
              />
            ))}
          </div>
        )}

        {!isLoading && (!Array.isArray(campers) || campers.length === 0) && (
          <p>No campers found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
