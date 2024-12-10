import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Script from "next/script";
import NextAuthSessionProvider from "../app/providers/SessionProvider";
import { SavedItemsProvider } from "@/context/SavedItemsContext";
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
          <SavedItemsProvider>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </SavedItemsProvider>
        </NextAuthSessionProvider>
        <Script
          strategy="lazyOnload"
          type="text/javascript"
          src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=551b0e6a70cfaba40d85e8fd7400b17d73807539"
        />
      </body>
    </html>
  );
}
