import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import "./globals.css";

// Archivo's width axis gives the display voice its expanded, machine-label stance.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vincent Hu — Automation, Controls & Robotics Engineer",
    template: "%s — HuCrafts",
  },
  description:
    "Portfolio of Vincent (Xiaolei) Hu: PLC-controlled machines, precision motion, lab automation, and robotics, built end to end.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
