import { createContext } from "react";
import { Instrument, User } from "../interfaces";

interface UserContext {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: { isAuthenticated: false, instruments: new Map<number, Instrument>() },
});
