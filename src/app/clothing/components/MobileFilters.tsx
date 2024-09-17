import React from "react";

type MobileFiltersProps = {
  availableTags: string[];
  activeFilters: string[];
  activeCategories: string[];
  activeCompanies: string[];
  activePriceRange: string | null;
  onFilterChange: (filter: string, checked: boolean) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onCompanyChange: (company: string, checked: boolean) => void;
  onPriceChange: (priceRange: string | null, checked: boolean) => void;
  clearFilters: () => void;
};

const companies = ["Roark"];
const categories = ["Bottoms", "Tops", "Outerwear", "Miscellaneous"];
const priceRanges = [
  { label: "Less than $50", value: "less-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200 - $500", value: "200-500" },
  { label: "More than $500", value: "more-500" },
];

const MobileFilters: React.FC<MobileFiltersProps> = ({
  availableTags = [], // Fallback to an empty array if undefined
  activeFilters = [],
  activeCategories = [],
  activeCompanies = [],
  activePriceRange = null,
  onFilterChange,
  onCategoryChange,
  onCompanyChange,
  onPriceChange,
  clearFilters,
}) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-heading font-semibold text-primary">
          Filters
        </h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-text-white hover:text-primary"
        >
          Clear all
        </button>
      </div>

      {/* Render price range pills */}
      {priceRanges.map((range) => (
        <button
          key={range.value}
          onClick={() =>
            onPriceChange(
              activePriceRange === range.value ? null : range.value,
              activePriceRange !== range.value
            )
          }
          className={`flex items-center px-4 py-2 rounded-full border text-sm ${
            activePriceRange === range.value
              ? "bg-accent text-white hover:bg-primary"
              : "bg-neutral-light text-primary hover:bg-neutral-mid"
          }`}
        >
          {range.label}
          {activePriceRange === range.value && (
            <span
              onClick={() => onPriceChange(null, false)}
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
          )}
        </button>
      ))}

      {/* Render company pills */}
      {companies.map((company) => (
        <button
          key={company}
          onClick={() =>
            onCompanyChange(company, !activeCompanies.includes(company))
          }
          className={`flex items-center px-4 py-2 rounded-full border text-sm ${
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

      {/* Render category pills */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            onCategoryChange(category, !activeCategories.includes(category))
          }
          className={`flex items-center px-4 py-2 rounded-full border text-sm ${
            activeCategories.includes(category)
              ? "bg-accent text-white hover:bg-primary"
              : "bg-neutral-light text-primary hover:bg-neutral-mid"
          }`}
        >
          {category}
          {activeCategories.includes(category) && (
            <span
              onClick={() => onCategoryChange(category, false)}
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
            onClick={() => onFilterChange(tag, !activeFilters.includes(tag))}
            className={`flex items-center px-4 py-2 rounded-full border text-sm ${
              activeFilters.includes(tag)
                ? "bg-accent text-white hover:bg-primary"
                : "bg-neutral-light text-primary hover:bg-neutral-mid"
            }`}
          >
            {tag}
            {activeFilters.includes(tag) && (
              <span
                onClick={() => onFilterChange(tag, false)}
                className="ml-2 cursor-pointer"
              >
                &times;
              </span>
            )}
          </button>
        ))
      ) : (
        <p className="text-sm text-text-white">No tags available</p>
      )}
    </div>
  );
};

export default MobileFilters;
