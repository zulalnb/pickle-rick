export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Result {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface Locations {
  info: Info;
  results: Result[];
}
