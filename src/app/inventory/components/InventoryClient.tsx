"use client";
import React, { useEffect, useState } from "react";
import OutfitTab from "./OutfitTab";
import InventoryTab from "./InventoryTab";

const tabs = [
  { name: "Inventory", current: false },
  { name: "Outfit", current: true },
];

interface InventoryClientProps {
  categorizedItems: any; // Replace 'any' with the appropriate type if known
}

export default function InventoryClient({
  categorizedItems,
}: InventoryClientProps) {
  const [selectedTab, setSelectedTab] = useState("Inventory");
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>(
    {}
  );

  console.log("Selected items:", selectedItems);

  useEffect(() => {
    console.log("Selected items have been updated.", selectedItems);
  }, [selectedItems]);

  const handleSelectItem = (category: string, item: any) => {
    setSelectedItems((prevSelectedItems) => {
      // If the clicked item is already selected, remove it
      if (prevSelectedItems[category]?._id === item._id) {
        const updatedSelectedItems = { ...prevSelectedItems };
        delete updatedSelectedItems[category]; // Remove the item from selected items
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
      delete updatedSelectedItems[category]; // Remove the item from selected items
      return updatedSelectedItems;
    });
  };

  console.log(categorizedItems);

  return (
    <div className="mt-2">
      {/* Mobile view: Select dropdown */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="block w-full rounded-lg border-neutral-mid focus:border-accent focus:ring-accent"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop view: Tab navigation */}
      <div className="hidden sm:flex items-center justify-center">
        <nav aria-label="Tabs" className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab.name)}
              className={`${
                selectedTab === tab.name
                  ? "border-secondary text-secondary-dark"
                  : "border-transparent text-primary hover:border-neutral-mid hover:text-neutral-dark"
              } whitespace-nowrap border-b-2 px-1 py-4 text-md font-medium`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

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
