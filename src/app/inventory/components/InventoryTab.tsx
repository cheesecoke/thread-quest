import { CheckCircleIcon } from "@heroicons/react/20/solid";

const CategorySection = ({ categorizedItems, selectedItems, onSelectItem }) => {
  return (
    <div className="space-y-8">
      {Object.keys(categorizedItems).map((category) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            {category}
          </h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {categorizedItems[category].map((item) => {
              const isSelected = selectedItems[category]?._id === item._id;
              return (
                <div
                  key={item._id}
                  className="relative flex-shrink-0 w-40 flex flex-col items-center"
                  onClick={() => onSelectItem(category, item)}
                >
                  <div className="relative w-32 h-32 rounded-xl object-cover shadow-lg group cursor-pointer">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid transition duration-200 ${
                        isSelected
                          ? "border-2 border-success ring-success"
                          : "hover:ring-accent"
                      }`}
                    />
                    {/* Heroicon for selected item */}
                    {isSelected && (
                      <div className="absolute -bottom-3 -right-3 flex items-center justify-center">
                        <div className="absolute m-auto w-6 h-6 bg-secondary rounded-full"></div>
                        <CheckCircleIcon className="relative w-8 h-8 text-success" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
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
      ))}
    </div>
  );
};

// InventoryTab component using the CategorySection with scrollable items
const InventoryTab = ({ categorizedItems, selectedItems, onSelectItem }) => {
  return (
    <div className="h-full overflow-y-auto space-y-8">
      <CategorySection
        categorizedItems={categorizedItems}
        selectedItems={selectedItems}
        onSelectItem={onSelectItem}
      />
    </div>
  );
};

export default InventoryTab;
