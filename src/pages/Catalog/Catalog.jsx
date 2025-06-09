import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";

import CampersCard from "../../components/CampersCard/CampersCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Catalog.module.css";
import { fetchCampers } from "../../redux/campers/campersThunks";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.list);
  const isLoading = useSelector(state => state.campers.isLoading);
  const isFiltering = useSelector(state => state.campers.isFiltering);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
    // можливо, тут викликати thunk для фільтрації?
  };

  return (
    <div className={styles.catalogPage}>
      <h1></h1>

      <FiltersPanel onFilterChange={handleFilterChange} />

      {isLoading || isFiltering ? (
        <Loader />
      ) : (
        <div className={styles.catalogList}>
          {campers.map(camper => (
            <CampersCard
              key={camper._id}
              camper={camper}
              className={styles.catalogItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
