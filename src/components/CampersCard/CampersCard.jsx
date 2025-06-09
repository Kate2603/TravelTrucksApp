import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import styles from "./CampersCard.module.css";

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
    return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
  };

  const equipmentList = [
    { label: "AC", value: airConditioner, icon: "icon-ac" },
    { label: "Bathroom", value: bathroom, icon: "icon-bathroom" },
    { label: "Kitchen", value: kitchen, icon: "icon-kitchen" },
    { label: "TV", value: tv, icon: "icon-tv" },
    { label: "Radio", value: radio, icon: "icon-radio" },
    { label: "Refrigerator", value: refrigerator, icon: "icon-refrigerator" },
    { label: "Microwave", value: microwave, icon: "icon-microwave" },
    { label: "Gas", value: gasStove, icon: "icon-gas" },
    { label: "Water", value: water, icon: "icon-water" },
  ];

  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.image}
        onError={e => {
          e.target.onerror = null;
          e.target.src = "/img/placeholder.jpg";
        }}
      />

      <h3 className={styles.name}>{name}</h3>

      <p className={styles.location}>
        <svg className={styles.icon}>
          <use href="/img/sprite.svg#icon-location" />
        </svg>
        {location}
      </p>

      <div className={styles.priceContainer}>
        <p className={styles.price}>${formatPrice(price)}</p>
        <button
          onClick={handleToggleFavorite}
          className={styles.favoriteButton}
          style={{ backgroundColor: isFavorite ? "#E44848" : "#101828" }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "Видалити з обраного" : "Додати до обраного"}
          <svg className={styles.favoriteIcon}>
            <use href="/img/sprite.svg#icon-heart" />
          </svg>
        </button>
      </div>

      <div className={styles.details}>
        <span className={styles.rating}>
          <svg
            className={styles.icon}
            style={{ fill: rating ? "#ffc531" : "#F2F4F7" }}
          >
            <use href="/img/sprite.svg#icon-star" />
          </svg>
          {rating ? `${rating} (${reviewsCount || 0} Reviews)` : "No Rating"}
        </span>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.equipment}>
        <ul>
          {equipmentList
            .filter(item => item.value)
            .map(({ label, icon }) => (
              <li key={label}>
                <svg className={styles.icon}>
                  <use href={`/img/sprite.svg#${icon}`} />
                </svg>{" "}
                {label}
              </li>
            ))}
        </ul>
      </div>

      <Link to={`/catalog/${id}`} className={styles.showMoreButton}>
        Show More
      </Link>
    </div>
  );
};

CampersCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
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
