import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  selectFilteredCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import CampersCard from "../../components/CampersCard/CampersCard";
import FiltersPanel from "../../components/FiltersPanel/FiltesPanel";

import styles from "./Catalog.module.css";
import Loader from "../../components/Loader/Loader";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredCampers);
  const isLoading = useSelector(selectIsLoading);

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleFilterChange = async () => {
    setIsFiltering(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // імітація обробки фільтрів
    setIsFiltering(false);
  };

  return (
    <div className={styles.catalogPage}>
      <h1>Available Campers</h1>

      <FiltersPanel onFilterChange={handleFilterChange} />

      {isLoading || isFiltering ? (
        <Loader />
      ) : (
        <div className={styles.camperList}>
          {campers.map(camper => (
            <CampersCard key={camper._id} camper={camper} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
