import type { ClothingItemTypes } from "../global/types";
// Inventory Client Types
export type SelectedItemsCategoriesTypes =
  | "Tops"
  | "Bottoms"
  | "Outerwear"
  | "Hats";

export type CategorizedItemsTypes = {
  [key in SelectedItemsCategoriesTypes]?: ClothingItemTypes[];
};

export type SelectedItemsTypes = {
  [key in SelectedItemsCategoriesTypes]?: ClothingItemTypes | undefined;
};

export interface TabTypes {
  name: string;
}

export interface InventoryNavTypes {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  tabs: TabTypes[];
}

// InventoryTab Component Types
export interface InventoryTabPropsTypes {
  categorizedItems: CategorizedItemsTypes;
  selectedItems: SelectedItemsTypes;
  onSelectItem: (category: string, item: ClothingItemTypes) => void;
  setSelectedTab: (tab: string) => void;
}

export type CategorySectionPropsTypes = InventoryTabPropsTypes;

// OutfitTab Component Types
export interface OutfitTabPropsTypes {
  selectedItems: Record<string, { name: string; imageUrl: string }>;
  setSelectedItems: (
    items: Record<string, { name: string; imageUrl: string }>
  ) => void;
  setSelectedTab: (tab: string) => void;
  onDelete: (category: string) => void;
}

export interface OutfitSectionPropsTypes {
  category: string;
  item: { name: string; imageUrl: string; link?: string };
  setSelectedTab: (tab: string) => void;
  onDelete: (category: string) => void;
  setSelectedOutfitId: (id: string | null) => void;
  comingSoon?: boolean;
}

// SavedOutfits Component Types
export type StatusType = "Purchased" | "In progress";

export interface OutfitItemTypes {
  dueDate?: string;
  dueDateTime?: string;
  id: string;
  name: string;
  items: {
    Hats?: ClothingItemTypes;
    Tops?: ClothingItemTypes;
    Outerwear?: ClothingItemTypes;
    Bottoms?: ClothingItemTypes;
    Belts?: ClothingItemTypes;
    Shoes?: ClothingItemTypes;
    Socks?: ClothingItemTypes;
  };
  status: StatusType;
}

export interface SavedOutfitsListPropsTypes {
  savedOutfits: OutfitItemTypes[];
  setSavedOutfits: (value: OutfitItemTypes[]) => void;
  selectedOutfitId: string | null;
  handleViewOutfit: (items: { [key: string]: any }, id: string) => void;
  userEmail: string | null;
}

export interface SavedItemMenuPropsTypes {
  editOutfit: string | null;
  saveEditedName: (id: string) => void;
  handlePurchaseStatus: (id: string) => void;
  handleViewOutfit: (items: { [key: string]: any }, id: string) => void;
  handleEditOutfit: (id: string, name: string) => void;
  handleDeleteOutfit: (id: string) => void;
  outfit: OutfitItemTypes;
}
