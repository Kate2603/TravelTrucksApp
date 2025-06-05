import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../redux/campers/campersSlice";
import styles from "./CamperDetailsPage.module.css";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector((state) => state.campers.currentCamper);
  const isLoading = useSelector((state) => state.campers.isLoading);
  const error = useSelector((state) => state.campers.error);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
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
          <img key={i} src={img} alt={`${camper.name}-${i}`} />
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
          ].map((key) =>
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
            (key) =>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Booking successful!");
          }}
        >
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
      </div>
    </div>
  );
}
