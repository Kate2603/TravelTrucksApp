import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import { selectFilteredCampers } from "../../redux/selectors";
import CampersCard from "../../components/CampersCard/CampersCard";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";

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
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFiltering(false);
  };

  return (
    <div className={styles.catalogPage}>
      <h1>Available Campers</h1>

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
