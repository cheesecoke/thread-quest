import React from "react";
import { categories, priceRanges } from "@/config/content";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import type { MobileFiltersPropsTypes } from "@/types/clothing/types";

// Companies and categories derived from content
const companies = categories.find((c) => c.id === "company")?.tags || [];
const availableTags = categories.reduce<string[]>((acc, c) => {
  if (c.id !== "company") {
    return [...acc, ...c.tags];
  }
  return acc;
}, []);

const MobileFilters: React.FC<MobileFiltersPropsTypes> = ({
  activeTags = [],
  activeCompanies = [],
  activePriceRange = null,
  onTagsChange,
  onCompanyChange,
  onPriceChange,
  clearFilters,
}) => {
  return (
    <div className="my-4">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-heading font-semibold text-primary">
                Filters
              </h2>
              <DisclosureButton className="flex justify-center py-2 text-primary focus:outline-none">
                {open ? (
                  <ChevronUpIcon className="w-6 h-6 text-primary" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-primary" />
                )}
              </DisclosureButton>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-secondary-dark focus:text-primary hover:text-primary transition duration-200"
              >
                Clear all
              </button>
            </div>

            <DisclosurePanel className="flex flex-wrap gap-2 mt-2">
              {/* Render company pills */}
              {companies.map((company) => (
                <button
                  key={company}
                  onClick={() =>
                    onCompanyChange(company, !activeCompanies.includes(company))
                  }
                  className={`flex items-center px-4 py-2 rounded-full border text-sm transition duration-200 ${
                    activeCompanies.includes(company)
                      ? "bg-accent text-white hover:bg-primary"
                      : "bg-neutral-light text-primary hover:bg-neutral-mid"
                  }`}
                >
                  {company}
                  {activeCompanies.includes(company) && (
                    <span
                      onClick={() => onCompanyChange(company, false)}
                      className="ml-2 cursor-pointer"
                    >
                      &times;
                    </span>
                  )}
                </button>
              ))}

              {/* Render tag pills */}
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagsChange(tag, !activeTags.includes(tag))}
                    className={`flex items-center px-4 py-2 rounded-full border text-sm transition duration-200 ${
                      activeTags.includes(tag)
                        ? "bg-accent text-white hover:bg-primary"
                        : "bg-neutral-light text-primary hover:bg-neutral-mid"
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    {activeTags.includes(tag) && (
                      <span
                        onClick={() => onTagsChange(tag, false)}
                        className="ml-2 cursor-pointer"
                      >
                        &times;
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <p className="text-sm text-text-secondary">No tags available</p>
              )}

              {/* Render price range pills */}
              {Object.entries(priceRanges).map(([rangeKey, rangeValue]) => (
                <button
                  key={rangeKey}
                  onClick={() =>
                    onPriceChange(
                      activePriceRange === rangeKey ? null : rangeKey,
                      activePriceRange !== rangeKey
                    )
                  }
                  className={`flex items-center px-4 py-2 rounded-full border text-sm transition duration-200 ${
                    activePriceRange === rangeKey
                      ? "bg-accent text-white hover:bg-primary"
                      : "bg-neutral-light text-primary hover:bg-neutral-mid"
                  }`}
                >
                  {`${
                    rangeValue[1] === Infinity ? "" : `$${rangeValue[0]} - `
                  } ${
                    rangeValue[1] === Infinity ? "$500+" : `$${rangeValue[1]}`
                  }`}
                  {activePriceRange === rangeKey && (
                    <span
                      onClick={() => onPriceChange(null, false)}
                      className="ml-2 cursor-pointer"
                    >
                      &times;
                    </span>
                  )}
                </button>
              ))}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MobileFilters;
