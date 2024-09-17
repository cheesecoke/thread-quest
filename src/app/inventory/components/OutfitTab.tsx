import { XCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Button from "@/app/components/Button";
import SavedOutfitsList from "./SavedOutfitsList";

const CatSection = ({ category, item, setSelectedTab, onDelete }) => {
  const hasImage = item?.imageUrl;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{category}</h3>
      </div>

      <div
        className={`relative w-32 h-32 rounded-xl object-cover shadow-lg group ${
          hasImage && "cursor-pointer"
        }`}
        onClick={() => onDelete(category)}
      >
        {hasImage ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-neutral-light rounded-lg flex items-center justify-center text-neutral-mid">
            <NoSymbolIcon className="w-8 h-8" />
          </div>
        )}

        <div
          className={`absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid ${
            hasImage ? "group-hover:ring-accent transition duration-200" : ""
          } `}
        />
        {hasImage && (
          <XCircleIcon
            fill="white"
            className="absolute -top-3 -right-3 w-8 h-8 text-neutral-mid group-hover:text-accent transition duration-200"
          />
        )}
      </div>
      {hasImage ? (
        <Button
          href={item.link}
          variant="outlined"
          type="primary"
          className="mt-4"
          size="md"
        >
          Buy Item
        </Button>
      ) : (
        <Button
          variant="outlined"
          type="primary"
          className="mt-4"
          size="md"
          onClick={() => setSelectedTab("Inventory")}
        >
          Pick
        </Button>
      )}
    </div>
  );
};

const OutfitTab = ({ selectedItems, setSelectedTab, onDelete }) => {
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

  console.log("selectedItems", selectedItems);
  console.log("outfit", outfit);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
      <div className="relative col-span-1 max-w-lg">
        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Hats"
              item={outfit.Hats}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Tops"
              item={outfit.Tops}
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Outerwear"
              item={outfit.Outerwear}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Bottoms"
              item={outfit.Bottoms}
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Belts"
              item={outfit.Belts}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 p-6">
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Shoes"
              item={outfit.Shoes}
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <CatSection
              onDelete={onDelete}
              setSelectedTab={setSelectedTab}
              category="Socks"
              item={outfit.Socks}
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
            onClick={() => console.log("Save Outfit")}
          >
            Save
          </Button>
        </div>
        <div className="relative col-span-1 row-span-1 flex justify-center h-full p-6">
          <SavedOutfitsList />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
        </div>
      </div>
    </div>
  );
};

export default OutfitTab;
