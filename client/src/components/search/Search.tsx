import React, { useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import InstrumentSelect from "./InstrumentSelect";
import LocationSelect from "./LocationSelect";
import PlayerCard from "./PlayerCard";
import { UserDetails } from "../../interfaces";

import "./Search.css";
import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function Search() {
  const [players, setPlayers] = useState<Array<UserDetails>>([]);
  const [instrument, setInstrument] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const { user } = useContext(UserContext);

  const handleSubmit = () => {
    Axios.get(process.env.REACT_APP_BACKEND + "users", {
      params: {
        instrument,
        location,
      },
    }).then((res) => setPlayers(res.data));
  };

  return user?.instruments.size === 0 ? (
    <p>Loading...</p>
  ) : (
    <div className="root">
      <Paper elevation={3} className="filter">
        <InstrumentSelect
          instrument={instrument}
          setInstrument={setInstrument}
          allInstruments={user?.instruments}
        />
        <LocationSelect location={location} setLocation={setLocation} />
        <Button
          variant="contained"
          color="secondary"
          className="search-button"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Paper>

      <Paper elevation={3} className="doctors">
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="space-evenly">
              {players.length === 0 ? (
                <p>No results found</p>
              ) : (
                players.map((player) => (
                  <Grid key={player.id} className="doctor-card">
                    <PlayerCard user={player} />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
