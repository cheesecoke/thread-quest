import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Button from "@/app/components/Button";

interface Item {
  _id: string;
  imageUrl: string;
  name: string;
  company: string;
  price: number;
}

interface CategorySectionProps {
  categorizedItems: { [key: string]: Item[] };
  selectedItems: { [key: string]: Item };
  onSelectItem: (category: string, item: Item) => void;
  setSelectedTab: (tab: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categorizedItems,
  selectedItems,
  onSelectItem,
  setSelectedTab,
}) => {
  return (
    <div className="space-y-8">
      {Object.keys(categorizedItems).map((category) => (
        <div key={category}>
          <h3 className="text-lg font-heading font-semibold mb-4 text-primary">
            {category}
          </h3>
          {/* Outer container with ring */}
          <div className="relative p-6 ring-1 ring-inset ring-neutral-mid rounded-xl mb-6 shadow">
            {/* Scrollable carousel */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {categorizedItems[category].map((item) => {
                const isSelected = selectedItems[category]?._id === item._id;
                return (
                  <div
                    key={item._id}
                    className="relative flex-shrink-0 w-40 flex flex-col items-center"
                    onClick={() => onSelectItem(category, item)}
                  >
                    <div className="relative w-32 h-32 rounded-xl object-cover group cursor-pointer shadow">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div
                        className={`absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid transition duration-200 ${
                          isSelected
                            ? "border-2 border-success ring-success"
                            : "hover:ring-accent"
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute -bottom-3 -right-3 flex items-center justify-center">
                          <div className="absolute m-auto w-6 h-6 bg-white rounded-full"></div>
                          <CheckCircleIcon className="relative w-8 h-8 text-success" />
                        </div>
                      )}
                    </div>
                    <div className="text-left mt-6">
                      <h3 className="text-sm font-bold font-heading">
                        {item.company}
                      </h3>
                      <h4 className="text-sm font-medium text-primary">
                        {item.name}
                      </h4>
                      <p className="text-sm text-neutral-mid">${item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button onClick={() => setSelectedTab("Outfit")} variant="outlined">
            View Outfit
          </Button>
        </div>
      ))}
    </div>
  );
};

interface InventoryTabProps {
  categorizedItems: { [key: string]: Item[] };
  selectedItems: { [key: string]: Item };
  onSelectItem: (category: string, item: Item) => void;
  setSelectedTab: (tab: string) => void;
}

const InventoryTab: React.FC<InventoryTabProps> = ({
  categorizedItems,
  selectedItems,
  onSelectItem,
  setSelectedTab,
}) => {
  return (
    <div className="h-full overflow-y-auto space-y-8">
      <CategorySection
        categorizedItems={categorizedItems}
        selectedItems={selectedItems}
        onSelectItem={onSelectItem}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
};

export default InventoryTab;
