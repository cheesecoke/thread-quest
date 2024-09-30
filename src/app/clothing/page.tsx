import { generateMetadata } from "../components/SEO";
import ClothingClient from "@/app/clothing/components/ClothingClient";

export const metadata = generateMetadata({ page: "clothing" });
export const dynamic = "force-dynamic"; // To ensure server-rendering happens
export const fetchCache = "force-no-store"; // Disable caching for dynamic content

// Server-side fetching for the initial items
async function fetchInitialItems() {
  const api =
    process.env.API_URL ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
    "http://localhost:3000";
  const res = await fetch(`${api}/api/clothing?page=1`);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  const data = await res.json();
  return data.items; // Assuming items are in the data response
}

export default async function ClothingPage() {
  const initialItems = await fetchInitialItems(); // Fetch initial items on the server

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
      {/* Pass the initial items to the client component */}
      <ClothingClient initialItems={initialItems} />
    </div>
  );
}
