"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { SavedItemsContextType } from "@/types/context/types";
import type { ClothingItemTypes } from "@/types/global/types";

// Create the context
const SavedItemsContext = createContext<SavedItemsContextType | undefined>(
  undefined
);

// Hook to access the context
export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider");
  }
  return context;
};

// SavedItemsProvider component
export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [savedItems, setSavedItems] = useState<ClothingItemTypes[] | null>(
    null
  ); // `null` indicates loading state
  const isAuthenticated = status === "authenticated";

  console.log("session::Context", session);
  console.log("savedItems::Context", savedItems);

  // Initialize `savedItems` when the session updates
  useEffect(() => {
    if (status === "loading" || savedItems !== null) return;

    if (session?.user?.savedItems) {
      setSavedItems(session.user.savedItems);
    } else {
      const fetchSavedItems = async () => {
        try {
          const res = await fetch("/api/saved-items");
          if (res.ok) {
            const { savedItems } = await res.json();
            setSavedItems(savedItems || []);
          } else {
            console.error("Failed to fetch saved items.");
            setSavedItems([]);
          }
        } catch (error) {
          console.error("Error fetching saved items:", error);
          setSavedItems([]);
        }
      };

      fetchSavedItems();
    }
  }, [session, status, savedItems]);

  // Function to toggle save state
  const toggleSaveItem = async (item: ClothingItemTypes) => {
    if (!savedItems || !session?.user?.email) return;

    const isAlreadySaved = savedItems.some((saved) => saved._id === item._id);
    const action = isAlreadySaved ? "remove" : "add";
    const updatedItems = isAlreadySaved
      ? savedItems.filter((saved) => saved._id !== item._id)
      : [...savedItems, item];

    // Optimistically update the UI
    const previousState = [...savedItems];
    setSavedItems(updatedItems);

    try {
      const res = await fetch("/api/saved-items/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, item, action }),
      });

      if (!res.ok) {
        console.error("Failed to toggle saved item on the backend");
        // Revert the state if backend update fails
        setSavedItems(previousState);
      } else {
        const { savedItems: updatedSavedItems } = await res.json();
        setSavedItems(updatedSavedItems); // Ensure the state matches the backend
      }
    } catch (error) {
      console.error("Error toggling saved item on the backend:", error);
      // Revert the state if an error occurs
      setSavedItems(previousState);
    }
  };

  return (
    <SavedItemsContext.Provider
      value={{ savedItems: savedItems || [], toggleSaveItem, isAuthenticated }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};
