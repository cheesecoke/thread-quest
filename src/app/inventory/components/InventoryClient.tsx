"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSavedItems } from "@/context/SavedItemsContext";
import { categorizeSavedItems } from "@/app/utils/categorizeSavedItems";
import type {
  SelectedItemsTypes,
  SelectedItemsCategoriesTypes,
} from "@/types/inventory/types";
import { ClothingItemTypes } from "@/types/global/types";
import dynamic from "next/dynamic";
import Button from "@/app/components/Button";

const OutfitTab = dynamic(() => import("./OutfitTab"));
const InventoryTab = dynamic(() => import("./InventoryTab"));
const DeskTopInvNav = dynamic(() => import("./DeskTopInvNav"));
const MobileDropdown = dynamic(() => import("./MobileDropdown"));

const tabs = [
  { name: "Inventory", current: false },
  { name: "Outfit", current: true },
];

export default function InventoryClient() {
  const { savedItems, isAuthenticated } = useSavedItems();
  const [selectedTab, setSelectedTab] = useState("Inventory");
  const [selectedItems, setSelectedItems] = useState<SelectedItemsTypes>({});

  const categorizedItems = categorizeSavedItems(savedItems);

  const handleSelectItem = (category: string, item: ClothingItemTypes) => {
    setSelectedItems((prevSelectedItems) => {
      const categorykey = category as SelectedItemsCategoriesTypes;
      // If the clicked item is already selected, remove it
      if (prevSelectedItems[categorykey]?._id === item._id) {
        const updatedSelectedItems = { ...prevSelectedItems };
        delete updatedSelectedItems[categorykey]; // Remove the item from selected items
        return updatedSelectedItems;
      }

      return {
        ...prevSelectedItems,
        [category]: item,
      };
    });
  };

  const onDelete = (category: string) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      delete updatedSelectedItems[category as SelectedItemsCategoriesTypes]; // Remove the item from selected items
      return updatedSelectedItems;
    });
  };

  // console.log("InventoryClient -> categorizedItems", categorizedItems);
  // console.log("InventoryClient -> selectedItems", selectedItems);

  return (
    <div className="mt-2">
      {isAuthenticated ? (
        <>
          <MobileDropdown
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={tabs}
          />

          <DeskTopInvNav
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          <div className="mt-6">
            {selectedTab === "Inventory" && (
              <InventoryTab
                setSelectedTab={setSelectedTab}
                selectedItems={selectedItems}
                categorizedItems={categorizedItems}
                onSelectItem={handleSelectItem}
              />
            )}
            {selectedTab === "Outfit" && (
              <OutfitTab
                setSelectedTab={setSelectedTab}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                onDelete={onDelete}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-4 items-center justify-center h-dvh">
          <p className="text-lg text-gray-500">
            Please sign in to view your inventory
          </p>

          <Button className="ml-4" onClick={() => signIn()}>
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}
