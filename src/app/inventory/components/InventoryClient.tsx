"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useSavedItems } from "@/context/SavedItemsContext";
import { categorizeSavedItems } from "@/app/utils/categorizeSavedItems";
import type {
  SelectedItemsTypes,
  SelectedItemsCategoriesTypes,
} from "@/types/inventory/types";
import { ClothingItemTypes } from "@/types/global/types";
import dynamic from "next/dynamic";

const OutfitTab = dynamic(() => import("./OutfitTab"));
const InventoryTab = dynamic(() => import("./InventoryTab"));
const DeskTopInvNav = dynamic(() => import("./DeskTopInvNav"));
const MobileDropdown = dynamic(() => import("./MobileDropdown"));

const tabs = [
  { name: "Inventory", current: false },
  { name: "Outfit", current: true },
];

export default function InventoryClient() {
  const { savedItems } = useSavedItems();
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

      // Otherwise, select the clicked item
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

  return (
    <div className="mt-2">
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

      {/* Content rendering based on selected tab */}
      <div className="mt-6">
        {selectedTab === "Inventory" && (
          <InventoryTab
            categorizedItems={categorizedItems}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            setSelectedTab={setSelectedTab}
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
    </div>
  );
}
