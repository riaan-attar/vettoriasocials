import type { Metadata } from "next";
import { Playfair_Display, DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
// Note: Clash Display requires a local font file, using Inter as a fallback setup for now.

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: '--font-playfair' });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], variable: '--font-dm-serif' });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Vettoria Socials Agency",
  description: "Want to scale your business? We got you covered up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSerif.variable} ${inter.variable} font-sans antialiased`}>
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
