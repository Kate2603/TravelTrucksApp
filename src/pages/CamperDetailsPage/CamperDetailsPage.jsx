// CamperDetailsPage.jsx
import { useEffect, useState, lazy, Suspense, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/campersThunks";
import styles from "./CamperDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const BookingForm = lazy(
  () => import("../../components/BookingForm/BookingForm")
);

const FEATURES = [
  { key: "airConditioner", label: "AC", icon: "icon-wind" },
  { key: "kitchen", label: "Kitchen", icon: "icon-cup-hot" },
  { key: "tv", label: "TV", icon: "icon-tv" },
  { key: "bathroom", label: "Bathroom", icon: "icon-shower" },
  { key: "radio", label: "Radio", icon: "icon-ui-radios" },
  { key: "refrigerator", label: "Fridge", icon: "icon-fridge" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "gasStove", label: "Gas Stove", icon: "icon-gas-stove" },
  { key: "water", label: "Water", icon: "ion_water-outline" },
];

const Gallery = memo(({ images, camperName }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = index => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className={styles.gallery}>
      {images?.map((img, i) => (
        <div key={i} className={styles.imageWrapper}>
          <img
            loading="lazy"
            src={img}
            alt={`${camperName}-${i}`}
            onLoad={() => handleImageLoad(i)}
            style={{
              opacity: loadedImages[i] ? 1 : 0,
              transition: "opacity 0.3s",
            }}
            className={styles.image}
          />
          {!loadedImages[i] && <div className={styles.skeleton} />}
        </div>
      ))}
    </div>
  );
});

const FeaturesBlock = memo(({ camper }) => (
  <div className={styles.featuresReviewsWrapper}>
    <div className={styles.features}>
      <ul className={styles.featuresList}>
        {FEATURES.map(
          ({ key, label, icon }) =>
            camper[key] && (
              <li key={key} className={styles.featureItem}>
                <svg className={styles.icon}>
                  <use href={`/sprite.svg#${icon}`} />
                </svg>
                {label}
              </li>
            )
        )}
      </ul>
    </div>

    <div className={styles.details}>
      <h2>Vehicle Details</h2>
      <ul className={styles.detailsGrid}>
        {Object.entries(camper.details || {}).map(([key, value]) => (
          <li key={key} className={styles.detailItem}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  </div>
));

const ReviewsBlock = memo(({ reviews }) => (
  <div className={styles.reviews}>
    <ul className={styles.reviewList}>
      {reviews?.map((r, i) => (
        <li key={i} className={styles.reviewItem}>
          <div className={styles.reviewer}>
            <strong>{r.reviewer_name}</strong> ⭐{r.rating}
          </div>
          <p>{r.comment}</p>
        </li>
      ))}
    </ul>
  </div>
));

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentCamper: camper,
    isLoading,
    error,
  } = useSelector(state => state.campers);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.metaTop}>
          <span className={styles.rating}>
            ⭐{camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>{camper.location}</span>
        </div>
        <div className={styles.metaBottom}>
          <span className={styles.price}>
            ₴
            {Number(camper.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <Gallery images={camper.gallery} camperName={camper.name} />
      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <span
          className={`${styles.tab} ${activeTab === "features" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </span>
        <span
          className={`${styles.tab} ${activeTab === "reviews" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </span>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.leftColumn}>
          {activeTab === "features" && <FeaturesBlock camper={camper} />}
          {activeTab === "reviews" && <ReviewsBlock reviews={camper.reviews} />}
        </div>

        <div className={styles.rightColumn}>
          <Suspense fallback={<Loader />}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
