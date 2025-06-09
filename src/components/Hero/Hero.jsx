import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = ({
  title = "Campers of your dreams",
  description = "Travel anywhere with style, comfort, and freedom. Choose your camper today.",
  buttonText = "View Now",
  to = "/catalog",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className="container">
        <div className={styles.content}>
          <h1>{title}</h1>
          <p>{description}</p>
          <button onClick={handleClick}>{buttonText}</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
