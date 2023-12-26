import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "Find all your favorite characters.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
