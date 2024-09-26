import type { ClothingItemTypes } from "../global/types";

export interface SavedItemsContextType {
  savedItems: ClothingItemTypes[];
  toggleSaveItem: (item: ClothingItemTypes) => void;
}
