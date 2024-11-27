import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import NextAuthSessionProvider from "../app/providers/SessionProvider";
import { content } from "@/config/content";
import { Lora, Poppins, Roboto } from "next/font/google";
import "./styles/globals.css";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

// Import fonts
const lora = Lora({ weight: ["400", "700"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

// Set default metadata for the whole site
export const metadata: Metadata = {
  title: "ThreadQuest - Curated Fashion",
  description: content.hero.subtitle,
  openGraph: {
    title: "ThreadQuest - Curated Fashion",
    description: content.hero.subtitle,
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreadQuest - Curated Fashion",
    description: content.hero.subtitle,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${roboto.className} ${lora.className}`}
      >
        <NextAuthSessionProvider session={session}>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
