import ClothingItem from "@/models/ClothingItem";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import testData from "../../../dummy/testdata.json"; // Assuming this is the path to your test data

// Define the type for categorized items
type CategorizedItems = {
  [key: string]: Array<{
    _id: string;
    category: string;
    tags: string[];
    // Add other fields as necessary
  }>;
};

// Example function to categorize items by category using the dummy data for saved item IDs
export async function getCategorizedSavedItems(): Promise<CategorizedItems> {
  await connectToDatabase();
  const savedItemIds = testData.user.savedItems; // Using dummy data to simulate saved items

  // Fetch all saved items by IDs from the ClothingItem collection using .lean() to return plain objects
  const savedItems: Array<{ _id: string; category: string; tags: string[] }> =
    (await ClothingItem.find({
      _id: { $in: savedItemIds },
    })
      .lean()
      .exec()) as Array<{ _id: string; category: string; tags: string[] }>;

  // Categorize items by their category field, but check for hats tag
  const categorizedItems: CategorizedItems = savedItems.reduce(
    (acc, savedItem) => {
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
    },
    {} as CategorizedItems
  );
  return categorizedItems;
}
