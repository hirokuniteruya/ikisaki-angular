import { User } from "./User";

export type Desk = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  user?: User;
};
