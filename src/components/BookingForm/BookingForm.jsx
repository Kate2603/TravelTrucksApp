import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./BookingForm.module.css";

const TextInput = ({ id, type = "text", formik, placeholder, label }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={formik.values[id]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder={placeholder}
      aria-invalid={formik.errors[id] && formik.touched[id] ? "true" : "false"}
    />
    {formik.touched[id] && formik.errors[id] && (
      <div className={styles.error} role="alert">
        {formik.errors[id]}
      </div>
    )}
  </div>
);

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
      comments: Yup.string().max(500, "Maximum 500 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      setIsSubmitted(true);
      resetForm();
    },
  });

  if (isSubmitted) {
    return (
      <div className={styles.successMessage} role="status" aria-live="polite">
        <h3>Your booking is confirmed!</h3>
        <p>Thank you for booking with us. We will be in touch soon!</p>
        <button onClick={() => setIsSubmitted(false)}>Book another</button>
      </div>
    );
  }

  return (
    <form
      className={styles.bookingForm}
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>

      <TextInput
        id="name"
        label="Name"
        placeholder="Enter your name"
        formik={formik}
      />

      <TextInput
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        formik={formik}
      />

      <div className={styles.inputGroup}>
        <label htmlFor="startDate">Booking date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={today}
        />
        {formik.touched.startDate && formik.errors.startDate && (
          <div className={styles.error} role="alert">
            {formik.errors.startDate}
          </div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="endDate">End date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={formik.values.startDate}
        />
        {formik.touched.endDate && formik.errors.endDate && (
          <div className={styles.error} role="alert">
            {formik.errors.endDate}
          </div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="comments">Comment (optional)</label>
        <textarea
          id="comments"
          name="comments"
          value={formik.values.comments}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Add any specific request here"
          rows="4"
        />
        {formik.touched.comments && formik.errors.comments && (
          <div className={styles.error} role="alert">
            {formik.errors.comments}
          </div>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default BookingForm;
