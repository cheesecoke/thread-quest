import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

type SidebarProps = {
  onFilterChange: (filter: string, checked: boolean) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onCompanyChange: (company: string, checked: boolean) => void;
  onPriceChange: (priceRange: string | null, checked: boolean) => void;
  activeFilters: string[];
  activeCategories: string[];
  activeCompanies: string[];
  activePriceRange: string | null;
  availableTags: string[];
};

const categories = [
  {
    id: "company",
    name: "Company",
    options: ["Roark", "Passenger"],
  },
  {
    id: "bottoms",
    name: "Bottoms",
    options: ["All Bottoms", "Pants", "Shorts"],
  },
  {
    id: "tops",
    name: "Tops",
    options: ["All Tops", "Shirts", "Polos", "Sweaters", "Hoodies"],
  },
  {
    id: "outerwear",
    name: "Outerwear",
    options: ["All Outerwear", "Jackets", "Pullovers", "Coats"],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    options: ["All Miscellaneous", "Hats", "Belts"],
  },
];

const priceRanges = [
  { label: "Less than $50", value: "less-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200 - $500", value: "200-500" },
  { label: "More than $500", value: "more-500" },
];

const Sidebar: React.FC<SidebarProps> = ({
  onFilterChange,
  onCategoryChange,
  onCompanyChange,
  onPriceChange,
  activeFilters = [],
  activeCategories = [],
  activeCompanies = [],
  activePriceRange = null,
}) => {
  return (
    <form className="divide-y divide-neutral-mid">
      {categories.map((section) => (
        <Disclosure
          defaultOpen={true}
          key={section.id}
          as="div"
          className="py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-text-secondary hover:text-primary">
                  <span className="font-medium text-primary">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusIcon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4 pl-4">
                  {section.options.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`${section.id}-${option}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        checked={
                          option.startsWith("All")
                            ? activeCategories
                                .map((cat) => cat.toLowerCase())
                                .includes(section.name.toLowerCase())
                            : activeFilters
                                .map((filter) => filter.toLowerCase())
                                .includes(option.toLowerCase()) ||
                              activeCompanies
                                .map((company) => company.toLowerCase())
                                .includes(option.toLowerCase())
                        }
                        onChange={(e) => {
                          const filter = option.startsWith("All")
                            ? section.name
                            : option;
                          if (option.startsWith("All")) {
                            onCategoryChange(filter, e.target.checked);
                          } else if (section.name === "Company") {
                            onCompanyChange(filter, e.target.checked);
                          } else if (section.name === "Price") {
                            onPriceChange(filter, e.target.checked);
                          } else {
                            onFilterChange(
                              filter.toLocaleLowerCase(),
                              e.target.checked
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`${section.id}-${option}`}
                        className="ml-3 text-sm text-text-secondary"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}

      {/* Price Range Filter */}
      <Disclosure defaultOpen={true} as="div" className="py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-text-secondary hover:text-primary">
                <span className="font-medium text-primary">Price</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4 pl-4">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center">
                    <input
                      id={`price-${range.value}`}
                      name="price[]"
                      type="checkbox"
                      checked={activePriceRange === range.value}
                      onChange={(e) =>
                        onPriceChange(
                          activePriceRange === range.value ? null : range.value,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor={`price-${range.value}`}
                      className="ml-3 text-sm text-text-secondary"
                    >
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </form>
  );
};

export default Sidebar;
