import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useSyncFiltersWithUrl = () => {
  const filters = useSelector(state => state.filters);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = {};

    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;
    if (filters.features.length > 0)
      params.features = filters.features.join(",");

    setSearchParams(params);
  }, [filters, setSearchParams]);
};
