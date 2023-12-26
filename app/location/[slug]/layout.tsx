import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location test",
  description: "Find all universes, characters, add to favorite ones.",
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
