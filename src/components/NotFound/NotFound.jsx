import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
