import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage1x from "../../img/Hero@1x.png";
import heroImage2x from "../../img/Hero@2x.png";
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState(heroImage1x);

  useEffect(() => {
    if (window.devicePixelRatio >= 2) {
      setHeroImage(heroImage2x);
    }
  }, []);

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.h1}>Campers of your dreams</h1>
          <p className={styles.p}>
            You can find everything you want in our catalog
          </p>
          <button className={styles.button} onClick={handleClick}>
            View Now
          </button>
        </div>
        <img
          src={heroImage}
          alt="Hero camper"
          className={styles.image}
          width={720}
          height={360}
        />
      </div>
    </section>
  );
};

export default Hero;
