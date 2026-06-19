import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoPulse AI | Carbon Footprint Tracker & Sustainability Platform",
  description: "Calculate, visualize, and reduce your carbon footprint with premium interactive tools, global statistics maps, and personalized AI sustainability coaching.",
  keywords: ["Carbon Footprint", "Sustainability", "AI Coach", "Climate Change", "Virtual Forest"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} bg-forest-dark text-gray-100 min-h-full flex flex-col antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
