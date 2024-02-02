import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

import styles from "./styles.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const notifyError = (toastMessage: string) =>
    toast.error(toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    toast("Please wait...");

    if (!(username && password)) {
      notifyError(" 🤦‍♀️ Please fill in all fields");
      return;
    }

    axios
      .post(
        process.env.REACT_APP_BACKEND + "users/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        Cookies.set("token", res.data.token, { expires: 7 });
        setUser &&
          setUser((user) => ({
            token: res.data.token,
            isAuthenticated: false,
            instruments: user.instruments,
          }));
      })
      .catch(() => {
        notifyError(" 💀 Oops, There was a server error");
      });
  };
  return (
    <div className={styles.form}>
      <h2>Login</h2>
      <Form>
        <div className={styles["form-flex"]}>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Username"
              className={styles["input"]}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </InputGroup>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Password"
              className={styles["input"]}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </InputGroup>
        </div>
        <Button variant="dark" className={styles.button} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <p>
        Don't have an account? Register <Link to="/signup">here</Link>
      </p>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}
