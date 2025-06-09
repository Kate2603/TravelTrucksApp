import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import styles from "./CampersCard.module.css";

const FEATURES = [
  { key: "airConditioner", label: "AC", icon: "icon-wind" },
  { key: "bathroom", label: "Bathroom", icon: "icon-shower" },
  { key: "kitchen", label: "Kitchen", icon: "icon-cup-hot" },
  { key: "tv", label: "TV", icon: "icon-tv" },
  { key: "radio", label: "Radio", icon: "icon-ui-radios" },
  { key: "refrigerator", label: "Fridge", icon: "icon-fridge" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "gasStove", label: "Gas Stove", icon: "icon-gas-stove" },
  { key: "water", label: "Water", icon: "ion_water-outline" },
];

const CampersCard = ({ camper }) => {
  const {
    id,
    name,
    price,
    location,
    rating,
    reviewsCount,
    description,
    image,
    airConditioner,
    kitchen,
    tv,
    bathroom,
    radio,
    refrigerator,
    microwave,
    gasStove,
    water,
  } = camper;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const formatPrice = price => {
    if (price === undefined || price === null) {
      return "Ціна недоступна";
    }
    return price.toLocaleString("en-EN", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <img
          src={image}
          alt={name}
          className={styles.image}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/img/placeholder.jpg";
          }}
        />

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.price}>{formatPrice(price)}</p>
          </div>

          <div className={styles.subinfo}>
            <span className={styles.rating}>
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-star" />
              </svg>
              {rating
                ? `${rating.toFixed(1)} (${reviewsCount || 0} Reviews)`
                : "No Rating"}
            </span>

            <span className={styles.location}>
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-location" />
              </svg>
              {location}
            </span>
          </div>

          <p className={styles.description}>{description}</p>

          <div className={styles.equipment}>
            <h4 className={styles.equipmentTitle}>Vehicle Equipment</h4>
            <ul className={styles.featuresList}>
              {FEATURES.map(({ key, label, icon }) => {
                if (!camper[key]) return null;
                return (
                  <li key={key} className={styles.featureItem}>
                    <svg className={styles.featureIcon}>
                      <use href={`/sprite.svg#${icon}`} />
                    </svg>
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.footer}>
            <Link to={`/catalog/${id}`} className={styles.showMoreButton}>
              Show More
            </Link>
            <button
              onClick={handleToggleFavorite}
              className={styles.favoriteButton}
              style={{ backgroundColor: isFavorite ? "#E44848" : "#101828" }}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg className={styles.favoriteIcon}>
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CampersCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number,
    reviewsCount: PropTypes.number,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    airConditioner: PropTypes.bool,
    bathroom: PropTypes.bool,
    kitchen: PropTypes.bool,
    tv: PropTypes.bool,
    radio: PropTypes.bool,
    refrigerator: PropTypes.bool,
    microwave: PropTypes.bool,
    gasStove: PropTypes.bool,
    water: PropTypes.bool,
  }).isRequired,
};

export default CampersCard;
