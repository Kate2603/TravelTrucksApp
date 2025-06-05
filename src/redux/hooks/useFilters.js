import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../store/filtersSlice";

export function useFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return { filters, updateFilters };
}
