import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BookingForm from "../BookingForm/BookingForm";
import styles from "./CamperDetails.module.css";

const CamperDetails = () => {
  const { id } = useParams();
  const campers = useSelector((state) => state.campers.items);
  const camper = campers.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("features");

  if (!camper) {
    return <p>Camper not found</p>;
  }

  const ratingColor = camper.rating ? "#ffc531" : "#F2F4F7";

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.name}>{camper.name}</h2>
      <span className={styles.rating}>
        <svg className={styles.icon} style={{ fill: ratingColor }}>
          <use href="/img/sprite.svg#icon-star" />
        </svg>
        {camper.rating}
      </span>
      <p className={styles.location}>
        <svg className={styles.icon}>
          <use href="/img/sprite.svg#icon-location" />
        </svg>
        {camper.location}
      </p>
      <p className={styles.price}>Price: ${camper.price.toFixed(2)}</p>

      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`Camper ${index}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button onClick={() => setActiveTab("features")}>Features</button>
        <button onClick={() => setActiveTab("reviews")}>Reviews</button>
      </div>

      {activeTab === "features" ? (
        <div className={styles.featuresSection}>
          <div className={styles.equipment}>
            <h3>Features:</h3>
            <ul>
              {camper.AC && <li>AC</li>}
              {camper.bathroom && <li>Bathroom</li>}
              {camper.kitchen && <li>Kitchen</li>}
              {camper.TV && <li>TV</li>}
              {camper.radio && <li>Radio</li>}
              {camper.refrigerator && <li>Refrigerator</li>}
              {camper.microwave && <li>Microwave</li>}
              {camper.gas && <li>Gas</li>}
              {camper.water && <li>Water</li>}
            </ul>
          </div>

          <div className={styles.specs}>
            <h3>Vehicle Details:</h3>
            <ul>
              <li>Form: {camper.form}</li>
              <li>Length: {camper.length}</li>
              <li>Width: {camper.width}</li>
              <li>Height: {camper.height}</li>
              <li>Tank Capacity: {camper.tank}</li>
              <li>Fuel Consumption: {camper.consumption}</li>
              <li>Transmission: {camper.transmission}</li>
              <li>Engine: {camper.engine}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.reviewsSection}>
          <h3>Customer Reviews</h3>
          {camper.reviews.length > 0 ? (
            camper.reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerAvatar}></div>
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
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      )}

      <div className={styles.bookingFormContainer}>
        <BookingForm
          onSubmit={(data) => console.log("Booking submitted", data)}
        />
      </div>
    </div>
  );
};

export default CamperDetails;
