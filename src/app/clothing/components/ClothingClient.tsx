"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/app/clothing/components/Sidebar";
import MobileFilters from "@/app/clothing/components/MobileFilters";
import ScrollToTopButton from "@/app/clothing/components/ScrollToTopButton";
import dynamic from "next/dynamic";
import { SavedItemsProvider } from "@/context/SavedItemsContext";
import type { ClothingItemTypes } from "@/types/global/types";

const ItemList = dynamic(() => import("@/app/clothing/components/ItemList"), {
  ssr: false,
});

export default function ClothingClient() {
  // State to hold items and filters
  const [loadedItems, setLoadedItems] = useState<ClothingItemTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<{
    tags: string[];
    companies: string[];
    prices: string | null;
  }>({
    tags: [],
    companies: [],
    prices: null,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Utility to clean empty or null filters from URL params
  const cleanFilters = (filters: any) => {
    const cleanedFilters = { ...filters };
    Object.keys(cleanedFilters).forEach((key) => {
      if (!cleanedFilters[key] || cleanedFilters[key].length === 0) {
        delete cleanedFilters[key];
      }
    });
    return cleanedFilters;
  };

  // Fetch items from the API based on filters
  const fetchItems = async (newPage = 1, appliedFilters = filters) => {
    setLoading(true);

    const query = new URLSearchParams(cleanFilters(appliedFilters)).toString();
    const res = await fetch(`/api/clothing?page=${newPage}&${query}`);
    const data = await res.json();

    if (newPage === 1) {
      setLoadedItems(data.items); // Reset items if it's a new page (i.e., new filters applied)
    } else {
      setLoadedItems((prev: any[]) => [...prev, ...data.items]); // Append new items for infinite scroll
    }

    setHasMore(data.items.length > 0); // Check if there are more items to load
    setLoading(false);
  };

  // Fetch initial items on client side
  useEffect(() => {
    fetchItems();
  }, []);

  // Initialize state from URL params on component mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const restoredFilters = {
      tags: params.getAll("tags"),
      companies: params.getAll("companies"),
      prices: params.get("prices"),
    };
    setFilters(restoredFilters); // Set filters state from URL params
    fetchItems(1, restoredFilters); // Fetch items based on initial filters
  }, [searchParams]);

  // Update URL parameters and trigger item fetch when filters change
  const applyFilters = (newFilters: any) => {
    const params = new URLSearchParams();

    // Loop through filters and ensure arrays are handled properly
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key])) {
        // Append each array item separately for proper query string format
        newFilters[key].forEach((item: string) => {
          params.append(key, item); // Adds each value separately
        });
      } else if (newFilters[key]) {
        // Add non-array values (e.g., price)
        params.set(key, newFilters[key]);
      }
    });

    const query = params.toString();
    const url = `${window.location.pathname}?${query}`;

    // Reset page and loaded items when filters are applied
    setPage(1);
    setHasMore(true); // Assume there are more items to fetch
    setLoadedItems([]); // Clear the loaded items to show only the filtered results

    router.replace(url); // Update the URL with properly formatted params
    fetchItems(1, newFilters); // Fetch items based on updated filters
  };

  // Handle changes in filters
  const handleFilterChange = (
    filterType: string,
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

  // Infinite scrolling logic
  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading) return;
    fetchItems(page + 1, filters); // Fetch the next page of items
    setPage((prevPage) => prevPage + 1); // Increment the page number
  }, [hasMore, loading, page, filters]);

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
    const clearedFilters = {
      tags: [],
      companies: [],
      prices: null,
    };

    // Reset filters, page, and assume more items are available
    setFilters(clearedFilters);
    setPage(1);
    setHasMore(true);
    setLoadedItems([]); // Clear the items when filters are cleared

    // Update URL to remove all query parameters
    router.replace(window.location.pathname);

    // Fetch all items without filters
    fetchItems(1, clearedFilters); // Fetch first page of all items
  };

  return (
    <SavedItemsProvider>
      <div className="lg:hidden">
        <Suspense fallback={<div>Loading Filters...</div>}>
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
          <Suspense fallback={<div>Loading Items...</div>}>
            {loadedItems.length > 0 ? (
              <ItemList items={loadedItems} />
            ) : (
              <div>No Items to display.</div>
            )}
          </Suspense>
          {loading && <div>Loading more items...</div>}
          <div ref={observerRef} />
        </div>
        <ScrollToTopButton />
      </div>
    </SavedItemsProvider>
  );
}
