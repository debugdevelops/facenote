import React from "react";
import TextField from "@material-ui/core/TextField";

import "./LocationSelect.css";

interface IProps {
  location: string;
  setLocation(location: string): void;
}

export default function LocationSelect({ location, setLocation }: IProps) {
  return (
    <TextField
      id="location"
      label="Location"
      className="location"
      value={location}
      onChange={(e) => {
        const location = e.target.value as string;
        setLocation(location);
      }}
    />
  );
}
