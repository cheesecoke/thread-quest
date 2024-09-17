// app/inventory/page.tsx (Server Component)
import React, { Suspense } from "react";
import SEOHead from "@/app/components/SEOHead";
import dynamic from "next/dynamic";
import ClothingItem from "@/models/ClothingItem";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import testData from "../../../dummy/testdata.json"; // Assuming this is the path to your test data

// Dynamic import of the client-side component
const InventoryClient = dynamic(
  () => import("@/app/inventory/components/InventoryClient"),
  { ssr: false }
);

// Example function to categorize items by category using the dummy data for saved item IDs
async function getCategorizedSavedItems() {
  await connectToDatabase();
  const savedItemIds = testData.user.savedItems; // Using dummy data to simulate saved items

  // Fetch all saved items by IDs from the ClothingItem collection using .lean() to return plain objects
  const savedItems = await ClothingItem.find({
    _id: { $in: savedItemIds },
  }).lean();

  // Categorize items by their category field, but check for hats tag
  const categorizedItems = savedItems.reduce((acc, savedItem) => {
    // Check if the item is a hat based on its tags
    if (
      savedItem.category === "Miscellaneous" &&
      savedItem.tags.includes("hats")
    ) {
      // Add it to the Hats category
      if (!acc["Hats"]) {
        acc["Hats"] = [];
      }
      acc["Hats"].push(savedItem);
    } else {
      // Otherwise, categorize by the regular category field
      const category = savedItem.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(savedItem);
    }

    return acc;
  }, {});

  return categorizedItems;
}

export default async function InventoryPage() {
  // Fetch the categorized saved items on the server-side
  const categorizedItems = await getCategorizedSavedItems();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SEOHead page="inventory" />
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-start items-center border-b border-neutral-mid pb-10">
          <h1 className="text-4xl font-bold">Inventory</h1>
        </div>
        <InventoryClient categorizedItems={categorizedItems} />
      </div>
    </Suspense>
  );
}
