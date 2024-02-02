import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Instrument, User } from "./interfaces";
import { UserContext } from "./contexts/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Band,
  Footer,
  Login,
  Navbar,
  Profile,
  Register,
  Search,
  Home,
} from "./components";

function App() {
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    instruments: new Map<number, Instrument>(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const cookie = user.token ? user.token : Cookies.get("token");
    cookie
      ? axios
          .post(
            process.env.REACT_APP_BACKEND + "users/get-user/",
            {},
            {
              headers: {
                Authorization: `Token ${cookie}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setUser((user) => ({
              isAuthenticated: true,
              user: res.data,
              token: `Token ${cookie}`,
              instruments: user.instruments,
            }));
            setLoading(false);
          })
          .catch((err) => {
            // Cookies.remove("token");
            setLoading(false);
          })
      : setLoading(false);
  }, [user]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "instruments/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const instruments = new Map<number, Instrument>();
        res.data.forEach((instrument: Instrument) => {
          instruments.set(instrument.id, instrument);
        });
        console.log(instruments);
        setUser((user) => {
          return {
            isAuthenticated: user.isAuthenticated,
            instruments: instruments,
          };
        });
      });
  }, []);

  interface RouteProps {
    component: React.ComponentType<any>;
    path: string;
    exact: boolean;
  }

  function PrivateRoute({ component: Component, ...rest }: RouteProps) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user.isAuthenticated ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function LoginRoute({ component: Component, ...rest }: RouteProps) {
    return (
      <Route
        {...rest}
        render={() =>
          !user.isAuthenticated ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: "/profile",
              }}
            />
          )
        }
      />
    );
  }

  const Routes = () => {
    return (
      <>
        <Navbar />
        <Switch>
          <LoginRoute exact path="/login" component={Login} />
          <LoginRoute exact path="/signup" component={Register} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/search" component={Search} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/band" component={Band} />
        </Switch>
        {/* <Footer /> */}
      </>
    );
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        {loading ? "Loading" : <Routes />}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
