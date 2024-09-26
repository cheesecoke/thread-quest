"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ItemList from "@/app/clothing/components/ItemList";
import Sidebar from "@/app/clothing/components/Sidebar";
import ScrollToTopButton from "@/app/clothing/components/ScrollToTopButton";
import Spinner from "@/app/components/Spinner";
import { SavedItemsProvider } from "@/context/SavedItemsContext";
import type { ClothingItemTypes } from "@/types/global/types";
import type { FilterTypes } from "@/types/clothing/types";
import dynamic from "next/dynamic";

const MobileFilters = dynamic(
  () => import("@/app/clothing/components/MobileFilters"),
  { suspense: true }
);

export default function ClothingClient({
  initialItems,
}: {
  initialItems: ClothingItemTypes[];
}) {
  const [loadedItems, setLoadedItems] = useState<ClothingItemTypes[]>(
    initialItems || []
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterTypes>({
    tags: [],
    companies: [],
    prices: null,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Utility to clean empty or null filters from URL params
  const cleanFilters = (filters: { [key: string]: any }) => {
    const cleanedFilters = { ...filters };
    Object.keys(cleanedFilters).forEach((key) => {
      if (!cleanedFilters[key] || cleanedFilters[key].length === 0) {
        delete cleanedFilters[key];
      }
    });
    return cleanedFilters;
  };

  // Fetch items from the API based on filters
  const fetchItems = useCallback(
    async (newPage = 1, appliedFilters = filters, reset = false) => {
      setLoading(true);
      const query = new URLSearchParams(
        cleanFilters(appliedFilters)
      ).toString();
      const res = await fetch(`/api/clothing?page=${newPage}&${query}`);
      const data = await res.json();

      if (reset) {
        setLoadedItems(data.items); // Reset items if it's a new page
      } else {
        setLoadedItems((prev) => [...prev, ...data.items]); // Append new items for infinite scroll
      }

      setHasMore(data.items.length > 0); // Check if there are more items to load
      setLoading(false);
    },
    [filters]
  );

  // Use searchParams to derive filter state from the URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const restoredFilters = {
      tags: params.getAll("tags"),
      companies: params.getAll("companies"),
      prices: params.get("prices"),
    };

    setFilters(restoredFilters); // Sync filters from the URL
    fetchItems(1, restoredFilters, true); // Fetch items based on updated filters in the URL
  }, [searchParams]);

  // Infinite scrolling logic
  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading) return;
    fetchItems(page + 1, filters); // Fetch the next page of items
    setPage((prevPage) => prevPage + 1); // Increment the page number
  }, [hasMore, loading, page, filters]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems(); // Load more items when the user scrolls to the bottom
        }
      },
      { rootMargin: "100px" }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore, loading, loadMoreItems]);

  // Clear all filters and reset
  const clearFilters = () => {
    const clearedFilters = { tags: [], companies: [], prices: null };

    // Reset filters, page, and assume more items are available
    setFilters(clearedFilters);
    setPage(1);
    setHasMore(true);
    setLoadedItems([]); // Clear the items when filters are cleared

    // Update URL to remove all query parameters
    router.replace(window.location.pathname);

    // Fetch all items without filters
    fetchItems(1, clearedFilters, true); // Fetch first page of all items and reset state
  };

  // Update URL parameters and trigger item fetch when filters change
  const applyFilters = (newFilters: FilterTypes) => {
    const params = new URLSearchParams();

    // Loop through filters and ensure arrays are handled properly
    (Object.keys(newFilters) as (keyof FilterTypes)[]).forEach((key) => {
      if (Array.isArray(newFilters[key])) {
        // Append each array item separately for proper query string format
        (newFilters[key] as string[]).forEach((item) =>
          params.append(key, item)
        );
      } else if (newFilters[key]) {
        // Add non-array values (e.g., price)
        params.set(key, newFilters[key] as string);
      }
    });

    const query = params.toString();
    const url = `${window.location.pathname}?${query}`;

    // Reset page and loaded items when filters are applied
    setPage(1);
    setHasMore(true); // Assume there are more items to fetch
    setLoadedItems([]); // Clear the loaded items to show only the filtered results

    router.replace(url); // Update the URL with properly formatted params
    fetchItems(1, newFilters, true); // Fetch items based on updated filters
  };

  // Handle changes in filters
  const handleFilterChange = (
    filterType: keyof FilterTypes,
    value: string,
    checked: boolean
  ) => {
    const updatedFilters = { ...filters };

    if (filterType === "tags" || filterType === "companies") {
      if (checked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]; // Add filter if checked
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        ); // Remove if unchecked
      }
    } else if (filterType === "prices") {
      updatedFilters.prices = checked ? value : null; // Set price filter
    }

    setFilters(updatedFilters); // Update local state
    applyFilters(updatedFilters); // Sync with URL and fetch items
  };

  return (
    <SavedItemsProvider>
      <div className="lg:hidden">
        <Suspense fallback={<Spinner />}>
          <MobileFilters
            activeTags={filters.tags}
            activeCompanies={filters.companies}
            activePriceRange={filters.prices as string | null}
            onTagsChange={(tag, checked) =>
              handleFilterChange("tags", tag, checked)
            }
            onCompanyChange={(company, checked) =>
              handleFilterChange("companies", company, checked)
            }
            onPriceChange={(price, checked) =>
              handleFilterChange("prices", price as string, checked)
            }
            clearFilters={clearFilters}
          />
        </Suspense>
      </div>
      <div className="pt-0 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {/* Sidebar for Filters */}
        <aside className="h-screen sticky top-24 lg:block hidden">
          <div className="flex justify-between py-6">
            <h2 className="text-lg font-heading font-bold text-primary">
              Filters
            </h2>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-secondary-dark hover:text-secondary hover:underline"
            >
              Clear all filters
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-96px)] pb-32">
            <div className="relative p-6 ring-1 ring-inset ring-neutral-mid rounded-xl mb-6 shadow">
              <Sidebar
                activeTags={filters.tags}
                activeCompanies={filters.companies}
                activePriceRange={filters.prices}
                onTagsChange={(tag, checked) =>
                  handleFilterChange("tags", tag, checked)
                }
                onCompanyChange={(company, checked) =>
                  handleFilterChange("companies", company, checked)
                }
                onPriceChange={(price, checked) =>
                  handleFilterChange("prices", price as string, checked)
                }
              />
            </div>
          </div>
        </aside>

        {/* Item list section */}
        <div className="lg:col-span-2 xl:col-span-3">
          <Suspense fallback={<Spinner />}>
            <ItemList
              items={loadedItems}
              clearFilters={clearFilters}
              loading={loading}
            />
          </Suspense>
          {loading && <Spinner />}
          <div ref={observerRef} />
        </div>
        <ScrollToTopButton />
      </div>
    </SavedItemsProvider>
  );
}
