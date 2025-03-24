import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./BookingForm.module.css";

const BookingForm = ({ onSubmit }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      startDate: today,
      endDate: today,
      comments: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      startDate: Yup.date()
        .min(today, "Start date cannot be in the past")
        .required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End date is required"),
      comments: Yup.string().max(500, "Maximum 500 characters").optional(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      setIsSubmitted(true);
      formik.resetForm();
    },
  });

  return (
    <div>
      {isSubmitted ? (
        <div className={styles.successMessage}>
          <h3>Your booking is confirmed!</h3>
          <p>Thank you for booking with us. We will be in touch soon!</p>
        </div>
      ) : (
        <form className={styles.bookingForm} onSubmit={formik.handleSubmit}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>

          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your name"
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.error}>{formik.errors.name}</div>
          )}

          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}

          <label htmlFor="startDate">Booking date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formik.values.startDate}
            min={today}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className={styles.error}>{formik.errors.startDate}</div>
          )}

          <label htmlFor="endDate">End date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formik.values.endDate}
            min={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className={styles.error}>{formik.errors.endDate}</div>
          )}

          <textarea
            id="comments"
            name="comments"
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Comment (optional)"
          />
          {formik.touched.comments && formik.errors.comments && (
            <div className={styles.error}>{formik.errors.comments}</div>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
