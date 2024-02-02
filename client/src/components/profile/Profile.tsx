import React, { useContext } from "react";
import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";
import Cookie from "js-cookie";
import { UserContext } from "../../contexts/UserContext";
import PlayerCard from "./PlayerCard";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    Cookie.remove("token");
    setUser &&
      setUser((user) => ({
        isAuthenticated: false,
        token: undefined,
        user: undefined,
        instruments: user.instruments,
      }));
  };

  return (
    <div className={styles.root}>
      {user?.user && <PlayerCard user={user?.user} />}
      <Button className="btn btn-dark" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
