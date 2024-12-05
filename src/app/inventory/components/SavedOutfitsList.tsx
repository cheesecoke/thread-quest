import { useState } from "react";
import type {
  OutfitItemTypes,
  SavedOutfitsListPropsTypes,
  StatusType,
} from "@/types/inventory/types";
import dynamic from "next/dynamic";

const SavedItemMenu = dynamic(() => import("./SavedItemMenu"));

const statuses = {
  Purchased: "text-success bg-success-light ring-success",
  "In progress": "text-neutral-dark text-warning ring-warning",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SavedOutfitsList({
  savedOutfits,
  setSavedOutfits,
  selectedOutfitId,
  handleViewOutfit,
  userEmail,
}: SavedOutfitsListPropsTypes) {
  const [editOutfit, setEditOutfit] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  const handleEditOutfit = (id: string, name: string) => {
    setEditOutfit(id);
    setEditedName(name);
  };

  const saveEditedName = async (id: string) => {
    if (!userEmail) {
      console.error("User email not found.");
      return;
    }

    const updatedOutfit = savedOutfits.find((outfit) => outfit.id === id);
    if (!updatedOutfit) return;

    try {
      const res = await fetch("/api/saved-outfits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          outfitId: id,
          newName: editedName,
        }),
      });

      if (res.ok) {
        const updatedOutfits = savedOutfits.map((outfit: OutfitItemTypes) =>
          outfit.id === id ? { ...outfit, name: editedName } : outfit
        );
        setSavedOutfits(updatedOutfits);
        setEditOutfit(null);
      } else {
        console.error("Failed to save edited outfit name.");
      }
    } catch (error) {
      console.error("Error saving edited outfit name:", error);
    }
  };

  const handleDeleteOutfit = async (id: string) => {
    if (!userEmail) {
      console.error("User email not found.");
      return;
    }

    try {
      const res = await fetch("/api/saved-outfits", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          outfitId: id,
        }),
      });

      if (res.ok) {
        const updatedOutfits = savedOutfits.filter(
          (outfit) => outfit.id !== id
        );
        setSavedOutfits(updatedOutfits);
      } else {
        console.error("Failed to delete outfit.");
      }
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  const handlePurchaseStatus = async (id: string) => {
    const updatedOutfit = savedOutfits.find((outfit) => outfit.id === id);
    if (!updatedOutfit) return;

    const newStatus =
      updatedOutfit.status === "Purchased"
        ? ("In progress" as StatusType)
        : ("Purchased" as StatusType);

    try {
      const res = await fetch("/api/saved-outfits", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        const updatedOutfits = savedOutfits.map((outfit) =>
          outfit.id === id ? { ...outfit, status: newStatus } : outfit
        );
        setSavedOutfits(updatedOutfits);
      } else {
        console.error("Failed to update purchase status.");
      }
    } catch (error) {
      console.error("Error updating purchase status:", error);
    }
  };

  return (
    <ul role="list" className="divide-y divide-neutral-mid w-full">
      {savedOutfits &&
        savedOutfits.map((outfit) => (
          <li
            key={outfit.id}
            className={classNames(
              "flex items-center justify-between gap-x-6 py-5 px-6 transition ease-in-out duration-200",
              selectedOutfitId === outfit.id ? "bg-neutral-light" : ""
            )}
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
              <SavedItemMenu
                editOutfit={editOutfit}
                saveEditedName={saveEditedName}
                handlePurchaseStatus={handlePurchaseStatus}
                handleViewOutfit={handleViewOutfit}
                handleEditOutfit={handleEditOutfit}
                handleDeleteOutfit={handleDeleteOutfit}
                outfit={outfit}
              />
            </div>
          </li>
        ))}
    </ul>
  );
}
