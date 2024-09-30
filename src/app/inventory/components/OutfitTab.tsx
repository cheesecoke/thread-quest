import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import SavedOutfitsList from "./SavedOutfitsList";
import type { OutfitTabPropsTypes } from "@/types/inventory/types";
import { isOutfitDuplicate } from "../utils/isOutfitDuplicate";
import dynamic from "next/dynamic";

const OutfitSection = dynamic(() => import("./OutfitSection"));

const OutfitTab = ({
  selectedItems,
  setSelectedItems,
  setSelectedTab,
  onDelete,
}: OutfitTabPropsTypes) => {
  const [savedOutfits, setSavedOutfits] = useState<any[]>([]);
  const [selectedOutfitId, setSelectedOutfitId] = useState<number | null>(null); // State to track the currently selected outfit

  // Load saved outfits from local storage
  useEffect(() => {
    const outfitsFromStorage = JSON.parse(
      localStorage.getItem("savedOutfits") || "[]"
    );
    setSavedOutfits(outfitsFromStorage);
  }, []);

  const saveOutfit = () => {
    if (isOutfitDuplicate(selectedItems, savedOutfits, setSelectedOutfitId)) {
      alert("Outfit already exists in saved outfits.");
      return;
    }

    const newOutfit = {
      id: savedOutfits.length + 1,
      name: `Outfit ${savedOutfits.length + 1}`,
      status: "In Progress",
      dueDate: new Date().toLocaleDateString(),
      dueDateTime: new Date().toISOString(),
      items: selectedItems,
    };

    const updatedOutfits = [...savedOutfits, newOutfit];
    setSavedOutfits(updatedOutfits);
    localStorage.setItem("savedOutfits", JSON.stringify(updatedOutfits));
  };

  const handleViewOutfit = (items: Record<string, any>, id: number) => {
    setSelectedOutfitId(id);
    setSelectedItems(items);
  };

  // Default structure for outfit categories
  const defaultOutfit = {
    Hats: { name: "No Hat", imageUrl: "" },
    Tops: { name: "No Top", imageUrl: "" },
    Outerwear: { name: "No Outerwear", imageUrl: "" },
    Bottoms: { name: "No Bottoms", imageUrl: "" },
    Belts: { name: "No Belt", imageUrl: "" },
    Shoes: { name: "No Shoes", imageUrl: "" },
    Socks: { name: "No Socks", imageUrl: "" },
  };

  // Merge selected items with the default structure
  const outfit = { ...defaultOutfit, ...selectedItems };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
      <div className="relative col-span-1 max-w-lg">
        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Hats"
              item={outfit.Hats}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Tops"
              item={outfit.Tops}
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Outerwear"
              item={outfit.Outerwear}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Bottoms"
              item={outfit.Bottoms}
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Belts"
              item={outfit.Belts}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Shoes"
              item={outfit.Shoes}
              comingSoon
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <OutfitSection
              onDelete={onDelete}
              setSelectedOutfitId={setSelectedOutfitId}
              setSelectedTab={setSelectedTab}
              category="Socks"
              item={outfit.Socks}
              comingSoon
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Saved Outfits</h2>
          <Button
            variant="outlined"
            type="primary"
            className="mt-4"
            size="sm"
            disabled={Object.keys(selectedItems).length === 0}
            onClick={saveOutfit}
          >
            Save
          </Button>
        </div>
        <div className="relative col-span-1 row-span-1 flex justify-center h-full py-6">
          <SavedOutfitsList
            savedOutfits={savedOutfits}
            setSavedOutfits={setSavedOutfits}
            selectedOutfitId={selectedOutfitId}
            handleViewOutfit={handleViewOutfit}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
        </div>
      </div>
    </div>
  );
};

export default OutfitTab;
