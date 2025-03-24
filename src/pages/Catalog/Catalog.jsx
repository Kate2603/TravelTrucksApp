import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampers } from "../../redux/operations.js";
import { selectFilteredCampers, selectLoading } from "../../redux/selectors.js";
import CamperCard from "../../components/CamperCard/CamperCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import styles from "./Catalog.module.css";
import { selectFilters } from "../../redux/filtersSlice.js";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredCampers); // Фільтровані кемпери
  const isLoading = useSelector(selectLoading); // Статус завантаження
  const filters = useSelector(selectFilters); // Поточні фільтри
  const [page, setPage] = useState(1); // Стан сторінки

  // Завантажуємо кемперів при зміні фільтрів або сторінки
  useEffect(() => {
    dispatch(fetchCampers(filters, page)); // Оновлення кемперів з фільтрами і пагінацією
  }, [dispatch, filters, page]); // Залежить від фільтрів і сторінки

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Завантажуємо наступні 4 елементи
  };

  return (
    <div className={styles.catalogContainer}>
      {/* Панель фільтрів */}
      <FilterPanel />

      {/* Виведення кемперів */}
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          <ul className={styles.catalogList}>
            {campers.slice(0, 4).map((camper) => (
              <li key={camper.id} className={styles.catalogItem}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>

          {/* Кнопка "Load more" */}
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            Load more
          </button>
        </>
      )}
    </div>
  );
};

export default Catalog;
