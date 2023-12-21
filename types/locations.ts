import { Info } from "./general";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface Locations {
  info: Info;
  results: Location[];
}
