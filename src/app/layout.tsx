import type { Metadata } from "next";
import { Lora, Poppins, Roboto } from "next/font/google";
import "./globals.css";

// Import fonts
const lora = Lora({ weight: ["400", "700"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

// Default global metadata for pages without specific SEO settings
export const metadata: Metadata = {
  title: "ThreadQuest - Curated Fashion",
  description:
    "Discover curated clothing collections from our favorite brands, organized by where they are worn on the body.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Global meta tags or shared assets */}</head>
      <body
        className={`${poppins.className} ${roboto.className} ${lora.className}`}
      >
        {children}
      </body>
    </html>
  );
}
