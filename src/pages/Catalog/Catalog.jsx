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
  const error = useSelector(state => state.campers.error);

  const [filters, setFilters] = useState({
    location: "",
    form: "",
    features: [],
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchCampers(filters));
    }, 500);
    return () => clearTimeout(timeout);
  }, [dispatch, filters]);

  const handleFilterChange = useCallback(newFilters => {
    setFilters(prevFilters => {
      if (
        prevFilters.location === newFilters.location &&
        prevFilters.form === newFilters.form &&
        JSON.stringify(prevFilters.features) ===
          JSON.stringify(newFilters.features)
      ) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);

  const campersState = useSelector(state => state.campers);
  console.log("FULL campers state:", campersState);

  return (
    <div className={styles.catalogPageWrapper}>
      <div className={styles.catalogPage}>
        <div className={styles.filtersWrapper}>
          <FiltersPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className={styles.catalogListWrapper}>
          {isLoading && <Loader />}

          {error && !isLoading && (
            <p className={styles.errorMessage}>
              Сталася помилка при завантаженні: {error}
            </p>
          )}

          {!isLoading &&
            !error &&
            Array.isArray(campers) &&
            campers.length > 0 && (
              <div className={styles.catalogList}>
                {campers
                  .filter(camper => camper?.id && camper?.name)
                  .slice(0, 4)
                  .map(camper => (
                    <CampersCard
                      key={`${camper.id}-${camper.name}`}
                      camper={camper}
                      className={styles.catalogItem}
                    />
                  ))}
              </div>
            )}

          {!isLoading &&
            !error &&
            (!Array.isArray(campers) || campers.length === 0) && (
              <p className={styles.emptyMessage}>
                Кемпери не знайдені за вибраними фільтрами.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
