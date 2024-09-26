import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { categories, priceRanges } from "@/config/content";
import type { SidebarPropsTypes } from "@/types/clothing/types";

const Sidebar: React.FC<SidebarPropsTypes> = ({
  onTagsChange,
  onCompanyChange,
  onPriceChange,
  activeTags = [],
  activeCompanies = [],
  activePriceRange = null,
}) => {
  return (
    <form className="divide-y divide-neutral-mid">
      {/* Category Filter */}
      {categories.map((section) => {
        const isAllCategorySelected = section.tags.every((tag) =>
          activeTags.includes(tag)
        );

        return (
          <Disclosure
            defaultOpen={true}
            key={section.id}
            as="div"
            className="py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-text-white hover:text-primary">
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
                    {/* Tags checkbox */}
                    {section.tags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          id={`${section.id}-${tag}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          checked={
                            activeTags.includes(tag) ||
                            activeCompanies.includes(tag)
                          }
                          onChange={(e) => {
                            if (section.name === "Company") {
                              onCompanyChange(tag, e.target.checked);
                            } else {
                              onTagsChange(tag, e.target.checked);
                            }
                          }}
                          className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`${section.id}-${tag}`}
                          className="ml-3 text-sm text-text-white"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        );
      })}

      {/* Price Range Filter */}
      <Disclosure defaultOpen={true} as="div" className="py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-text-white hover:text-primary">
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
                {Object.entries(priceRanges).map(([rangeKey, rangeValue]) => (
                  <div key={rangeKey} className="flex items-center">
                    <input
                      id={`price-${rangeKey}`}
                      name="price[]"
                      type="checkbox"
                      checked={activePriceRange === rangeKey}
                      onChange={(e) =>
                        onPriceChange(
                          activePriceRange === rangeKey ? null : rangeKey,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor={`price-${rangeKey}`}
                      className="ml-3 text-sm text-text-white"
                    >
                      {`${
                        rangeValue[1] === Infinity ? "" : `$${rangeValue[0]} - `
                      } ${
                        rangeValue[1] === Infinity
                          ? "$500+"
                          : `$${rangeValue[1]}`
                      }`}
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
