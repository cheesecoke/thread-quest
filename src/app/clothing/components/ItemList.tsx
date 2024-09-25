import React, { useState } from "react";
import Image from "next/image";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useSavedItems } from "@/context/SavedItemsContext";
import type { ItemListPropsTypes } from "@/types/clothing/types";

const ItemList: React.FC<ItemListPropsTypes> = ({ items }) => {
  const { savedItems, toggleSaveItem } = useSavedItems();
  // Safeguard: Ensure items is an array before mapping
  // Pass Loading state to only show one at a time
  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items to display.</div>;
  }

  return (
    <div className="flex flex-wrap">
      {items.map((item) => {
        const isSaved = savedItems.some((saved) => saved._id === item._id);

        return (
          <div key={item._id} className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <div className="border border-neutral-mid rounded-lg overflow-hidden shadow">
              <a href={item.link}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={267}
                  height={321}
                  className="w-full h-48 object-cover"
                  priority
                />
              </a>
              <div className="p-4">
                {/* Updated item name with font-heading */}
                <h3 className="text-sm sm:text-lg font-heading font-bold text-primary">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="tex-sm sm:text-lg font-body text-primary">
                    ${item.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleSaveItem(item)}
                    className="text-secondary hover:text-secondary-dark"
                  >
                    {isSaved ? (
                      <SolidHeartIcon className="h-6 w-6" />
                    ) : (
                      <OutlineHeartIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <p className="text-sm font-body text-text-white font-semibold">
                  {item.category}
                </p>
                <div className="my-2">
                  {/* Safeguard: Ensure tags is defined and an array */}
                  {Array.isArray(item.tags) && item.tags.length > 0 ? (
                    item.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className="inline-block text-sm text-text-white mr-2"
                      >
                        {tag}
                        {index < item.tags.length - 1 && " |"}
                      </span>
                    ))
                  ) : (
                    <span className="inline-block text-sm text-text-white">
                      No tags available
                    </span>
                  )}
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Buy on {item.company}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
