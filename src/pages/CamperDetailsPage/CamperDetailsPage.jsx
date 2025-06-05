import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/campersSlice";
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
      await new Promise(resolve => setTimeout(resolve, 2000)); // імітація API
      alert("Booking successful!");
    } catch (error) {
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
      <h1>{camper.name}</h1>
      <p>
        Price:{" "}
        {Number(camper.price).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
        ₴
      </p>

      <div className={styles.gallery}>
        {camper.gallery?.map((img, i) => (
          <div key={i} className={styles.imageWrapper}>
            {!loadedImages[i] && <Loader />}
            <img
              src={img}
              alt={`${camper.name}-${i}`}
              onLoad={() => handleImageLoad(i)}
              style={{ display: loadedImages[i] ? "block" : "none" }}
            />
          </div>
        ))}
      </div>

      <div className={styles.features}>
        <h2>Features</h2>
        <ul>
          {[
            "AC",
            "kitchen",
            "TV",
            "radio",
            "refrigerator",
            "microwave",
            "bathroom",
            "gas",
            "water",
            "transmission",
            "engine",
          ].map(key =>
            camper[key] ? (
              <li key={key}>
                {key}: {camper[key]}
              </li>
            ) : null
          )}
        </ul>
      </div>

      <div className={styles.details}>
        <h2>Details</h2>
        <ul>
          {["form", "length", "width", "height", "tank", "consumption"].map(
            key =>
              camper.details?.[key] ? (
                <li key={key}>
                  {key}: {camper.details[key]}
                </li>
              ) : null
          )}
        </ul>
      </div>

      <div className={styles.reviews}>
        <h2>Reviews</h2>
        <ul>
          {(camper.reviews || []).map((r, i) => (
            <li key={i}>
              <strong>{r.reviewer_name}</strong> - {r.comment} ⭐{r.rating}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.booking}>
        <h2>Book this camper</h2>
        {isBooking ? (
          <Loader />
        ) : (
          <form onSubmit={handleBooking}>
            <label>
              Name:
              <input type="text" required />
            </label>
            <label>
              Phone:
              <input type="tel" required />
            </label>
            <button type="submit">Book now</button>
          </form>
        )}
      </div>
    </div>
  );
}
