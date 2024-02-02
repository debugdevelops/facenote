import React, { RefObject, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { UserContext } from "../../contexts/UserContext";

export default function Navbar() {
  const user = useContext(UserContext);
  const navbar = useRef<HTMLUListElement>(null);

  const navbarToggle = () => {
    navbar.current?.classList.toggle(styles.open);
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>FaceNote</span>
      <div className={styles.hamburger} onClick={navbarToggle}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      {user.user?.isAuthenticated ? (
        <ul className={styles["nav-links"]} ref={navbar}>
          <li>
            <Link to="/" className={styles["nav-link"]} onClick={navbarToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/band"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              <span className={styles["violet-button"]}>My Band</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              <span className={styles["orange-button"]}>Profile</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles["nav-links"]} ref={navbar}>
          <li>
            <Link to="/" className={styles["nav-link"]} onClick={navbarToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              <span className={styles["violet-button"]}>Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className={styles["nav-link"]}
              onClick={navbarToggle}
            >
              <span className={styles["orange-button"]}>Sign Up</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
