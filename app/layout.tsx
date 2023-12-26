import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./Provider";
import Navigation from "@/components/Navigation";

import "../styles/global.scss";
import 'react-loading-skeleton/dist/skeleton.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Find all universes, characters, add to favorite ones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
