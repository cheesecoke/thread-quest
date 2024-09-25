import { ClothingItemTypes } from "../global/types";

// Sidebar Component Types
export type SidebarPropsTypes = {
  onTagsChange: (filter: string, checked: boolean) => void;
  onCompanyChange: (company: string, checked: boolean) => void;
  onPriceChange: (priceRange: string | null, checked: boolean) => void;
  activeTags: string[];
  activeCompanies: string[];
  activePriceRange: string | null;
};

// MobileFilters Component Types
export type MobileFiltersPropsTypes = {
  activeTags: string[];
  activeCompanies: string[];
  activePriceRange: string | null;
  onTagsChange: (filter: string, checked: boolean) => void;
  onCompanyChange: (company: string, checked: boolean) => void;
  onPriceChange: (priceRange: string | null, checked: boolean) => void;
  clearFilters: () => void;
};

// Itemslis Component Types
export type ItemListPropsTypes = {
  items: ClothingItemTypes[];
};
