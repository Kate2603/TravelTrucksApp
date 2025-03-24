import React from "react";
import { useSelector } from "react-redux";
import BookingForm from "./components/BookingForm/BookingForm";
import Loader from "./components/Loader/Loader";
import styles from "./TabView.module.css";

const TabView = () => {
  const selectedCamper = useSelector((state) => state.campers.selectedCamper);
  const isLoading = useSelector((state) => state.campers.status === "loading");

  // Якщо дані ще завантажуються, показуємо індикатор завантаження
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.tabViewContainer}>
      {/* Ліва частина - Відгуки */}
      <div className={styles.reviewsSection}>
        <h2>Customer Reviews</h2>
        {selectedCamper ? (
          selectedCamper.reviews.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            selectedCamper.reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerAvatar}></div>{" "}
                  {/* Місце для аватарки */}
                  <div className={styles.reviewerDetails}>
                    <h3>{review.reviewer_name}</h3>
                    <div className={styles.reviewerRating}>
                      {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={
                            starIndex < review.reviewer_rating
                              ? styles.filledStar
                              : styles.emptyStar
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))
          )
        ) : (
          <p>Select a camper to view reviews</p>
        )}
      </div>

      {/* Права частина - Форма бронювання */}
      <div className={styles.bookingFormSection}>
        {selectedCamper ? (
          <>
            <h2>Booking for {selectedCamper.name}</h2>
            {/* Інтегруємо форму бронювання */}
            <BookingForm />
          </>
        ) : (
          <p>Select a camper to book</p>
        )}
      </div>
    </div>
  );
};

export default TabView;
