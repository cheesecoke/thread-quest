export const isOutfitDuplicate = (
  newOutfitItems: Record<string, { name: string; imageUrl: string }>,
  savedOutfits: Array<{
    id: number;
    items: Record<string, { name: string; imageUrl: string }>;
  }>,
  setSelectedOutfitId: (id: number | null) => void
) => {
  return savedOutfits.some((savedOutfit) => {
    const newOutfitCategories = Object.keys(newOutfitItems);
    const savedOutfitCategories = Object.keys(savedOutfit.items);

    // Ensure the number of categories is the same
    if (newOutfitCategories.length !== savedOutfitCategories.length) {
      return false;
    }

    // Check if all items match exactly
    return newOutfitCategories.every((category) => {
      const newItem = newOutfitItems[category];
      const savedItem = savedOutfit.items[category];

      // If the outfit is a duplicate, set the selected outfit ID to the saved outfit
      setSelectedOutfitId(savedOutfit.id);

      // Ensure that the category exists in both outfits and the items match
      return (
        newItem &&
        savedItem &&
        newItem.name === savedItem.name &&
        newItem.imageUrl === savedItem.imageUrl
      );
    });
  });
};
