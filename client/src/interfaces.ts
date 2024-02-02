export interface UserDetails {
  id: number;
  name: string;
  email: string;
  username: string;
  instrument: number;
  bio?: string;
  location: string;
}

export interface User {
  isAuthenticated: boolean;
  user?: UserDetails;
  token?: string;
  instruments: Map<number, Instrument>;
}

export interface Instrument {
  id: number;
  name: string;
}
