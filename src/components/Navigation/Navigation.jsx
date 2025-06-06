import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.menu}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
};

export default Navigation;
