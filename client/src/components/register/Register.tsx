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
import InstrumentSelect from "./InstrumentSelect";

import styles from "./styles.module.css";

export default function Register() {
  const [instrument, setInstrument] = useState<string>("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const { user, setUser } = useContext(UserContext);

  const notifyError = (toastMessage: string) =>
    toast.error(toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    toast("Please wait...");

    if (
      !(username && password && bio && email && location && name && instrument)
    ) {
      notifyError(" 🤦‍♀️ Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      notifyError(" 🤦‍♀️ Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      notifyError(" 🤦‍♀️ Passwords do not match");
      return;
    }

    axios
      .post(
        process.env.REACT_APP_BACKEND + "users/register/",
        {
          username,
          password,
          bio,
          email,
          location,
          name,
          instrument,
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
      .catch((err) => {
        for (let key in err.response.data.errors) {
          notifyError(
            key[0].toUpperCase() +
              key.slice(1) +
              ": " +
              err.response.data.errors[key][0]
          );
        }
      });
  };

  return user?.instruments?.size === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className={styles.form}>
      <h2>Register</h2>
      <Form>
        <div className={styles["form-flex"]}>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Name"
              className={styles["input"]}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputGroup>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Username"
              className={styles["input"]}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </InputGroup>
        </div>
        <div className={styles["form-flex"]}>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Email"
              className={styles["input"]}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Location"
              className={styles["input"]}
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </InputGroup>
        </div>
        <div className={styles["form-flex"]}>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Password"
              className={styles["input"]}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </InputGroup>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              placeholder="Confirm Password"
              className={styles["input"]}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
            />
          </InputGroup>
        </div>
        <div className={styles["form-flex"]}>
          <InstrumentSelect
            allInstruments={user && user.instruments}
            instrument={instrument}
            setInstrument={setInstrument}
          />
        </div>
        <div className={styles["form-flex"]}>
          <InputGroup className={styles["input-group"]}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Bio"
              className={styles["textarea"]}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </InputGroup>
        </div>
        <Button variant="dark" className={styles.button} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <p>
        Have an account already? Login <Link to="/login">here</Link>
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
