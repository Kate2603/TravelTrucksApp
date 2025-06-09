import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/campersThunks";
import styles from "./CamperDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(state => state.campers.currentCamper);
  const isLoading = useSelector(state => state.campers.isLoading);
  const error = useSelector(state => state.campers.error);
  const [isBooking, setIsBooking] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const handleImageLoad = index => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleBooking = async e => {
    e.preventDefault();
    setIsBooking(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Booking successful!");
    } catch {
      alert("Booking failed!");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.meta}>
          <span className={styles.price}>
            ₴
            {Number(camper.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
            <span className={styles.per}>/ per day</span>
          </span>
          <span className={styles.location}>{camper.location}</span>
        </div>
      </div>

      <div className={styles.gallery}>
        {camper.gallery?.map((img, i) => (
          <div key={i} className={styles.imageWrapper}>
            {!loadedImages[i] && <Loader />}
            <img
              src={img}
              alt={`${camper.name}-${i}`}
              onLoad={() => handleImageLoad(i)}
              style={{ display: loadedImages[i] ? "block" : "none" }}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.features}>
        <h2>Features</h2>
        <ul className={styles.featuresList}>
          {[
            "AC",
            "kitchen",
            "TV",
            "radio",
            "refrigerator",
            "microwave",
            "bathroom",
          ].map(key =>
            camper[key] ? (
              <li key={key} className={styles.featureItem}>
                {key}
              </li>
            ) : null
          )}
        </ul>
      </div>

      <div className={styles.details}>
        <h2>Details</h2>
        <ul className={styles.detailsGrid}>
          {["form", "length", "width", "height", "tank", "consumption"].map(
            key =>
              camper.details?.[key] ? (
                <li key={key}>
                  <strong>{key}:</strong> {camper.details[key]}
                </li>
              ) : null
          )}
        </ul>
      </div>

      <div className={styles.reviews}>
        <h2>Reviews</h2>
        <ul className={styles.reviewList}>
          {camper.reviews?.map((r, i) => (
            <li key={i} className={styles.reviewItem}>
              <div className={styles.reviewer}>
                <strong>{r.reviewer_name}</strong> ⭐{r.rating}
              </div>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.booking}>
        <h2>Book this camper</h2>
        {isBooking ? (
          <Loader />
        ) : (
          <form onSubmit={handleBooking} className={styles.form}>
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone" required />
            <button type="submit">Book now</button>
          </form>
        )}
      </div>
    </div>
  );
}
