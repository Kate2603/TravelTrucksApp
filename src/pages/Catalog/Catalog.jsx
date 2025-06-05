import React from "react";
import { useSelector } from "react-redux";
import CamperCard from "./CamperCard";
import FiltersPanel from "./FiltersPanel";
import { selectFilteredCampers } from "../store/selectors";
import { useFilters } from "../hooks/useFilters";

export default function Catalog() {
  const campers = useSelector(selectFilteredCampers);
  const { filters, updateFilters } = useFilters();

  return (
    <div>
      <FiltersPanel filters={filters} onChange={updateFilters} />
      <div className="catalog-list">
        {campers.length === 0 ? (
          <p>No campers found matching your criteria.</p>
        ) : (
          campers.map((camper) => (
            <CampersCard key={camper.id} camper={camper} />
          ))
        )}
      </div>
    </div>
  );
}
