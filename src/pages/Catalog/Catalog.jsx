import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  resetCampers,
  incrementPage,
} from "../../redux/campersSlice";
import CampersCard from "../CampersCard/CampersCard";

const Catalog = () => {
  const dispatch = useDispatch();
  const { filters, page, items, hasMore, status } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(
      fetchCampers({
        page: 1,
        location: filters.location,
        form: filters.form,
        features: filters.features,
      })
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.location, filters.form, filters.features.join(",")]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(
      fetchCampers({
        page: page + 1,
        location: filters.location,
        form: filters.form,
        features: filters.features,
      })
    );
  };

  return (
    <div>
      {items.map((camper) => (
        <CampersCard key={camper.id} camper={camper} />
      ))}
      {status === "loading" && <p>Завантаження...</p>}
      {hasMore && status !== "loading" && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default Catalog;
