import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "@/app/components/Button";
import SavedOutfitsList from "./SavedOutfitsList";
import type { OutfitTabPropsTypes } from "@/types/inventory/types";
import { isOutfitDuplicate } from "../utils/isOutfitDuplicate";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const OutfitSection = dynamic(() => import("./OutfitSection"));

const OutfitTab = ({
  selectedItems,
  setSelectedItems,
  setSelectedTab,
  onDelete,
}: OutfitTabPropsTypes) => {
  const [savedOutfits, setSavedOutfits] = useState<any[]>([]);
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        if (!session?.user?.email) return;

        const res = await fetch(
          `/api/saved-outfits?email=${session.user.email}`
        );
        if (res.ok) {
          const { savedOutfits } = await res.json();
          setSavedOutfits(savedOutfits);
        }
      } catch (error) {
        console.error("Failed to fetch saved outfits:", error);
      }
    };

    if (session?.user?.email) {
      fetchSavedOutfits();
    }
  }, [session]);

  const saveOutfit = () => {
    if (!Array.isArray(savedOutfits)) {
      console.error("Saved outfits is not initialized as an array.");
      return;
    }

    if (isOutfitDuplicate(selectedItems, savedOutfits, setSelectedOutfitId)) {
      alert("Outfit already exists in saved outfits.");
      return;
    }

    const newOutfit = {
      id: uuidv4(),
      name: `Outfit ${savedOutfits.length + 1}`,
      status: "In Progress",
      dueDate: new Date().toLocaleDateString(),
      dueDateTime: new Date().toISOString(),
      items: selectedItems,
    };

    const updatedOutfits = [...savedOutfits, newOutfit];
    setSavedOutfits(updatedOutfits);

    try {
      fetch("/api/saved-outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          outfit: newOutfit,
        }),
      });
      setSelectedOutfitId(newOutfit.id);
    } catch (error) {
      console.error("Failed to save outfit:", error);
    }
  };

  const handleViewOutfit = (items: Record<string, any>, id: string) => {
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
            userEmail={session?.user?.email ?? null}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
        </div>
      </div>
    </div>
  );
};

export default OutfitTab;
