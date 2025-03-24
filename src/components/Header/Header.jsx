import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoText}>
          <span className={styles.travel}>Travel</span>
          <span className={styles.truck}>Truck</span>
        </NavLink>
      </div>
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
    </header>
  );
};

export default Header;
