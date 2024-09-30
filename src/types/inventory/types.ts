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
  setSelectedOutfitId: (id: number | null) => void;
  comingSoon?: boolean;
}

export interface OutfitTypes {
  id: number;
  name: string;
  status: StatusType;
  dueDate: string;
  dueDateTime: string;
  items: CategorizedItemsTypes;
}

export interface SavedItemMenuPropsTypes {
  editOutfit: number | null;
  saveEditedName: (id: number) => void;
  handlePurchaseStatus: (id: number) => void;
  handleViewOutfit: (items: { [key: string]: any }, id: number) => void;
  handleEditOutfit: (id: number, name: string) => void;
  handleDeleteOutfit: (id: number) => void;
  outfit: OutfitTypes;
}

// SavedOutfits Component Types
export type StatusType = "Purchased" | "In progress";

export interface OutfitItemTypes {
  id: number;
  name: string;
  href: string;
  status: StatusType;
  dueDate: string;
  dueDateTime: string;
  items: { [key: string]: any };
}

export interface SavedOutfitsListPropsTypes {
  savedOutfits: OutfitItemTypes[];
  setSavedOutfits: (value: OutfitItemTypes[]) => void;
  selectedOutfitId: number | null;
  handleViewOutfit: (items: { [key: string]: any }, id: number) => void;
}
