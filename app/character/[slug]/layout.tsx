import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Characters by Location",
  description: "Find all characters in this location.",
};

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
