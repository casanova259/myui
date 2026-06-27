import localFont from "next/font/local";

export const neueHaas = localFont({
  src: [
    {
      path: "../fonts/NeueHaasDisplayBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
});