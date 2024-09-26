import React from "react";
import Button from "@/app/components/Button";

type NoItemsTypes = {
  clearFilters: () => void;
};

const NoItems: React.FC<NoItemsTypes> = ({ clearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <h2 className="text-xl font-heading font-semibold text-primary mb-4">
        No items found
      </h2>
      <p className="text-neutral-mid mb-6">
        It seems there are no items available at the moment. Check back later or
        explore other categories.
      </p>
      <Button
        onClick={() => clearFilters()}
        className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition duration-200"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default NoItems;
