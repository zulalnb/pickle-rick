export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type Status = "Alive" | "Dead" | "unknown";
