import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Button from "@/app/components/Button";
import { set } from "mongoose";

const statuses = {
  Purchased: "text-success bg-success-light ring-success",
  "In progress": "text-neutral-dark text-warning ring-warning",
};

type Status = "Purchased" | "In progress";

interface OutfitItem {
  id: number;
  name: string;
  href: string;
  status: Status;
  dueDate: string;
  dueDateTime: string;
  items: any; // Add types for items
}

interface SavedOutfitsListProps {
  savedOutfits: OutfitItem[];
  setSavedOutfits: (value: OutfitItem[]) => void;
  setSelectedItems: (items: any) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SavedOutfitsList({
  savedOutfits,
  setSavedOutfits,
  setSelectedItems,
}: SavedOutfitsListProps) {
  const [editOutfit, setEditOutfit] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  const handleEditOutfit = (id: number, name: string) => {
    setEditOutfit(id);
    setEditedName(name);
  };

  const saveEditedName = (id: number) => {
    const updatedOutfits = savedOutfits.map((outfit: OutfitItem) =>
      outfit.id === id ? { ...outfit, name: editedName } : outfit
    ) as OutfitItem[];
    setSavedOutfits(updatedOutfits as OutfitItem[]);
    localStorage.setItem("savedOutfits", JSON.stringify(updatedOutfits));
    setEditOutfit(null);
  };

  const handleDeleteOutfit = (id: number) => {
    const updatedOutfits = savedOutfits.filter((outfit) => outfit.id !== id);
    setSavedOutfits(updatedOutfits as OutfitItem[]);
    localStorage.setItem("savedOutfits", JSON.stringify(updatedOutfits));
  };

  const handleViewOutfit = (items: OutfitItem) => {
    setSelectedItems(items);
  };

  const handlePurchaseStatus = (id: number) => {
    const updatedOutfits = savedOutfits.map((outfit) =>
      outfit.id === id
        ? {
            ...outfit,
            status: outfit.status === "Purchased" ? "In progress" : "Purchased",
          }
        : outfit
    );
    setSavedOutfits(updatedOutfits as OutfitItem[]);
    localStorage.setItem("savedOutfits", JSON.stringify(updatedOutfits));
  };

  return (
    <ul role="list" className="divide-y divide-neutral-mid w-full">
      {savedOutfits.map((outfit) => (
        <li
          key={outfit.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              {editOutfit === outfit.id ? (
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border border-neutral-mid rounded-lg p-2"
                />
              ) : (
                <p className="text-sm font-semibold leading-6 text-primary">
                  {outfit.name}
                </p>
              )}
              <p
                className={classNames(
                  statuses[outfit.status] || statuses["In progress"],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {outfit.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-neutral-dark">
              <p className="whitespace-nowrap">
                Created on{" "}
                <time dateTime={outfit.dueDateTime}>{outfit.dueDate}</time>
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            {editOutfit === outfit.id ? (
              <>
                {/* Add handles to api call to update saved item */}
                <Button
                  href="#"
                  variant="outlined"
                  size="sm"
                  onClick={() => handlePurchaseStatus(outfit.id)}
                  className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                >
                  Purchased<span className="sr-only">, {outfit.name}</span>
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => saveEditedName(outfit.id)}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleViewOutfit(outfit.items)}
                  variant="outlined"
                  size="sm"
                  href={outfit.href}
                >
                  View Outfit
                </Button>
                <Button variant="outlined" size="sm" href="#">
                  Buy Outfit<span className="sr-only">, {outfit.name}</span>
                </Button>
              </>
            )}
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-primary hover:text-accent">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-neutral-mid focus:outline-none"
              >
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => handleEditOutfit(outfit.id, outfit.name)}
                    className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                  >
                    Edit
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => handleDeleteOutfit(outfit.id)}
                    className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                  >
                    Delete<span className="sr-only">, {outfit.name}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
