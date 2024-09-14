import { XCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Button from "@/app/components/Button";

const CatSection = ({ category, item, setSelectedTab, onDelete }) => {
  const hasImage = item?.imageUrl;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{category}</h3>
      </div>

      {/* Wrapping the entire section with an onClick */}
      <div
        className={`relative w-32 h-32 rounded-xl object-cover shadow-lg group ${
          hasImage && "cursor-pointer"
        }`}
        onClick={onDelete}
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
        <Button href={item.link} variant="outlined" className="mt-4">
          Buy Item
        </Button>
      ) : (
        <Button
          onClick={() => setSelectedTab("Inventory")}
          variant="outlined"
          className="mt-4"
        >
          Pick
        </Button>
      )}
    </div>
  );
};

const OutfitTab = ({ selectedItems, setSelectedTab }) => {
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

  return (
    <div className="relative mx-auto max-w-lg">
      <div className="relative grid grid-cols-2 gap-4 p-6">
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Hats"
            item={outfit.Hats}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4 p-6">
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Tops"
            item={outfit.Tops}
          />
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Outerwear"
            item={outfit.Outerwear}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4 p-6">
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Bottoms"
            item={outfit.Bottoms}
          />
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Belts"
            item={outfit.Belts}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-4 p-6">
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Shoes"
            item={outfit.Shoes}
          />
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center">
          <CatSection
            setSelectedTab={setSelectedTab}
            category="Socks"
            item={outfit.Socks}
          />
        </div>
      </div>

      {/* Collapsible menu positioned on the right */}
      <div className="fixed top-1/3 right-0 w-1/4 h-auto bg-gray-300 p-4 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Menu</h2>
        </div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block hover:text-blue-500">
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-500">
              Save
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-500">
              Clear
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OutfitTab;
