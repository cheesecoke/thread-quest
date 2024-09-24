type CategorizedItems = {
  [key: string]: Array<Item>;
};

export function categorizeSavedItems(savedItems: Item[]): CategorizedItems {
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
    } else {
      const category = savedItem.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(savedItem);
    }

    return acc;
  }, {} as CategorizedItems);
}
