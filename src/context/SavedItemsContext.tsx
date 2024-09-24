"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the item type
type Item = {
  _id: string;
  category: string;
  tags: string[];
  name: string;
  price: string;
  imageUrl: string;
  link: string;
  company: string;
};

// Define context type
interface SavedItemsContextType {
  savedItems: Item[];
  toggleSaveItem: (item: Item) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(
  undefined
);

// Use the custom hook
export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider");
  }
  return context;
};

export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedItems, setSavedItems] = useState<Item[]>([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem("savedItems");
    if (storedItems) {
      setSavedItems(JSON.parse(storedItems));
    }
  }, []);

  // Function to toggle save state
  const toggleSaveItem = (item: Item) => {
    const isAlreadySaved = savedItems.some((saved) => saved._id === item._id);
    const updatedItems = isAlreadySaved
      ? savedItems.filter((saved) => saved._id !== item._id)
      : [...savedItems, item];

    setSavedItems(updatedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedItems));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, toggleSaveItem }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
