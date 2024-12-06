type Item = {
  category: string;
  tags: string[];
};

type CategorizedItems = {
  [key: string]: Array<Item>;
};

export function categorizeSavedItems(
  savedItems: Item[] = []
): CategorizedItems {
  return savedItems.reduce((acc, savedItem) => {
    // Check if the item is a hat based on its tags
    if (
      savedItem.category === "Miscellaneous" &&
      savedItem.tags.includes("hats")
    ) {
      if (!acc["Hats"]) {
        acc["Hats"] = [];
      }
      acc["Hats"].push(savedItem);
    }
    // Check if the item is a belt based on its tags
    else if (
      savedItem.category === "Miscellaneous" &&
      savedItem.tags.includes("belts")
    ) {
      if (!acc["Belts"]) {
        acc["Belts"] = [];
      }
      acc["Belts"].push(savedItem);
    }
    // For all other items, categorize based on their actual category field
    else {
      const category =
        savedItem.category === "Accessories" && savedItem.tags.includes("belts")
          ? "Belts" // Override "Accessories" category for items with "belts" tag
          : savedItem.category; // Use default category for other items

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(savedItem);
    }

    return acc;
  }, {} as CategorizedItems);
}
