"use client";
import React, { useEffect, useState } from "react";
import OutfitTab from "./OutfitTab";
import InventoryTab from "./InventoryTab";

const tabs = [
  { name: "Outfit", current: true },
  { name: "Inventory", current: false },
];

export default function InventoryClient({ categorizedItems }) {
  const [selectedTab, setSelectedTab] = useState("Outfit");
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    console.log("Selected items have been updated.", selectedItems);
  }, [selectedItems]);

  const handleSelectItem = (category, item) => {
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

  console.log(categorizedItems);

  return (
    <div className="mt-8">
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
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab.name)}
              className={`${
                selectedTab === tab.name
                  ? "border border-neutral-light text-accent"
                  : "text-primary hover:text-accent hover:bg-neutral-light"
              } rounded-lg px-3 py-2 text-sm font-medium transition duration-300 ease-in-out`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content rendering based on selected tab */}
      <div className="mt-6">
        {selectedTab === "Outfit" && (
          <OutfitTab
            setSelectedTab={setSelectedTab}
            selectedItems={selectedItems}
          />
        )}
        {selectedTab === "Inventory" && (
          <InventoryTab
            categorizedItems={categorizedItems}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
          />
        )}
      </div>
    </div>
  );
}
