import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice.js";
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
  } = camper;

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  const ratingColor = rating ? "#ffc531" : "#F2F4F7";
  const favoriteButtonColor = isFavorite ? "#E44848" : "#101828";

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
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
          className={`${styles.favoriteButton} ${
            isFavorite ? "active" : "inactive"
          }`}
          style={{ backgroundColor: favoriteButtonColor }}
        >
          <svg className={styles.favoriteIcon}>
            <use href="/img/sprite.svg#icon-heart" />
          </svg>
        </button>
      </div>
      <div className={styles.details}>
        <span className={styles.rating}>
          <svg className={styles.icon} style={{ fill: ratingColor }}>
            <use href="/img/sprite.svg#icon-star" />
          </svg>
          {rating ? `${rating} (${reviewsCount} Reviews)` : "No Rating"}
        </span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.equipment}>
        <ul>
          {camper.AC && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-ac" />
              </svg>{" "}
              AC
            </li>
          )}
          {camper.bathroom && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-bathroom" />
              </svg>{" "}
              Bathroom
            </li>
          )}
          {camper.kitchen && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-kitchen" />
              </svg>{" "}
              Kitchen
            </li>
          )}
          {camper.TV && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-tv" />
              </svg>{" "}
              TV
            </li>
          )}
          {camper.radio && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-radio" />
              </svg>{" "}
              Radio
            </li>
          )}
          {camper.refrigerator && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-refrigerator" />
              </svg>{" "}
              Refrigerator
            </li>
          )}
          {camper.microwave && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-microwave" />
              </svg>{" "}
              Microwave
            </li>
          )}
          {camper.gas && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-gas" />
              </svg>{" "}
              Gas
            </li>
          )}
          {camper.water && (
            <li>
              <svg className={styles.icon}>
                <use href="/img/sprite.svg#icon-water" />
              </svg>{" "}
              Water
            </li>
          )}
        </ul>
      </div>
      <Link to={`/campers/${id}`} className={styles.showMoreButton}>
        Show More
      </Link>
    </div>
  );
};

export default CampersCard;
