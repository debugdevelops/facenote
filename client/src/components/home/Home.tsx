import React, { useContext } from "react";
import styles from "./styles.module.css";
import Band from "../../assets/images/band.png";
import orangeWave from "../../assets/images/orange_wave.svg";
import violetWave from "../../assets/images/violet_wave.svg";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Home() {
  const user = useContext(UserContext);
  return (
    <div>
      <div className={styles.section}>
        <div className={styles["main-text"]}>
          <h1>Looking for talented musicians just like you? </h1>
          <h2>We provide you the platform to form your dream band</h2>
          {user.user?.isAuthenticated ? (
            <div className={styles["button-container"]}>
              <Link to="/search">
                <Button variant="outline-dark">Search</Button>
              </Link>
              <Link to="/profile">
                <Button variant="dark">Profile</Button>
              </Link>
            </div>
          ) : (
            <div className={styles["button-container"]}>
              <Link to="/login">
                <Button variant="outline-dark">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="dark">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        <div className={styles["band-image"]}>
          <img src={Band} alt="band" />
        </div>
      </div>
      <div className={styles.waves}>
        <img
          src={orangeWave}
          alt="orange wave"
          className={styles["orange-wave"]}
        />
        <img
          src={violetWave}
          alt="violet wave"
          className={styles["violet-wave"]}
        />
      </div>
    </div>
  );
}
