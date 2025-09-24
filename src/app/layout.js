import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Portfolio | Andrés Calderón Romo",
  description:
    "Portafolio de Andrés Calderón Romo, desarrollador web y diseñador UX/UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
