import type { InventoryTabPropsTypes } from "@/types/inventory/types";
import dynamic from "next/dynamic";

const CategorySection = dynamic(() => import("./CategorySection"));

const InventoryTab: React.FC<InventoryTabPropsTypes> = ({
  categorizedItems,
  selectedItems,
  onSelectItem,
  setSelectedTab,
}) => {
  return (
    <>
      <div className="flex justify-center text-neutral">
        <div className="border border-info px-4 py-1 rounded-full">
          Select items for your outfit
        </div>
      </div>
      <div className="h-full overflow-y-auto space-y-8">
        <CategorySection
          categorizedItems={categorizedItems}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </>
  );
};

export default InventoryTab;
