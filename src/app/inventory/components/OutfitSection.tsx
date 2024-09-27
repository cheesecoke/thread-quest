import Button from "@/app/components/Button";
import { XCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import type { OutfitSectionPropsTypes } from "@/types/inventory/types";

const OutfitSection = ({
  category,
  item,
  setSelectedTab,
  onDelete,
  setSelectedOutfitId,
  comingSoon,
}: OutfitSectionPropsTypes) => {
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
        onClick={() => {
          onDelete(category);
          setSelectedOutfitId(null);
        }}
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
            hasImage
              ? "group-hover:ring-accent transition ease-in-out duration-200"
              : ""
          } `}
        />
        {hasImage && (
          <XCircleIcon
            fill="white"
            className="absolute -top-3 -right-3 w-8 h-8 text-neutral-mid group-hover:text-accent transition ease-in-out duration-200"
          />
        )}
      </div>
      {comingSoon && (
        <>
          <br /> <span className="text-sm h-11">Coming Soon</span>
        </>
      )}
      {!comingSoon &&
        (hasImage ? (
          <Button
            href={item.link}
            variant="outlined"
            type="secondary"
            className="mt-4"
            size="md"
            externalLink
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
        ))}
    </div>
  );
};

export default OutfitSection;
