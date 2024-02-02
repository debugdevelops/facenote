import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./InstrumentSelect.css";
import { Instrument } from "../../interfaces";

interface IProps {
  instrument: string;
  setInstrument(instrument: string): void;
  allInstruments: Map<number, Instrument> | undefined;
}

export default function InstrumentSelect({
  allInstruments,
  instrument,
  setInstrument,
}: IProps) {
  const MenuItemGenerator = () => {
    const returnArray: Array<React.ReactNode> = [];
    allInstruments &&
      allInstruments.forEach((instrument, instrument_id) =>
        returnArray.push(
          <MenuItem value={instrument_id}>
            {instrument.name[0].toUpperCase() + instrument.name.slice(1)}
          </MenuItem>
        )
      );

    return (
      <Select
        labelId="instrument"
        id="instrument-select"
        value={instrument}
        onChange={(e) => {
          const instrument = e.target.value as string;
          setInstrument(instrument);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {returnArray}
      </Select>
    );
  };

  return (
    <FormControl className="drop-down">
      <InputLabel id="instrument">Instrument</InputLabel>
      <MenuItemGenerator />
    </FormControl>
  );
}
