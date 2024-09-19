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

const ItemList = dynamic(() => import("@/app/clothing/components/ItemList"), {
  ssr: false,
});

export default function ClothingClient({ itemsData }: { itemsData: any }) {
  const [loadedItems, setLoadedItems] = useState<any[]>(
    itemsData.initialItems || []
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    itemsData.totalItemsCount > loadedItems.length
  );
  const [filters, setFilters] = useState<{
    tags: string[];
    categories: string[];
    companies: string[];
    price: string | null;
  }>({
    tags: [],
    categories: [],
    companies: [],
    price: null,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      const query = searchParams;
      const restoredFilters = {
        tags: query.getAll("tags"),
        categories: query.getAll("categories"),
        companies: query.getAll("companies"),
        price: query.get("price"),
      };
      setFilters(restoredFilters);
      fetchItems(1, restoredFilters);
    }
  }, [searchParams]);

  const fetchItems = async (newPage = 1, appliedFilters = filters) => {
    setLoading(true);
    const query = new URLSearchParams(cleanFilters(appliedFilters)).toString();
    const res = await fetch(`/api/clothing?page=${newPage}&${query}`);
    const data = await res.json();

    if (newPage === 1) {
      setLoadedItems(data.items);
    } else {
      setLoadedItems((prev: any[]) => [...prev, ...data.items]);
    }

    setHasMore(
      data.items.length > 0 && data.items.length < data.totalItemsCount
    );
    setPage(newPage);
    setLoading(false);
  };

  // Clean filters by removing empty/null values
  const cleanFilters = (filters: any) => {
    const cleanedFilters = { ...filters };
    Object.keys(cleanedFilters).forEach((key) => {
      if (!cleanedFilters[key] || cleanedFilters[key].length === 0) {
        delete cleanedFilters[key];
      }
    });
    return cleanedFilters;
  };

  const applyFilters = (newFilters: any) => {
    const query = new URLSearchParams(cleanFilters(newFilters)).toString();
    const url = `${window.location.pathname}?${query}`;
    router.replace(url);
    fetchItems(1, newFilters);
  };

  // Clear filters function: resets state and URL, and refetches items
  const clearFilters = () => {
    const clearedFilters = {
      tags: [],
      categories: [],
      companies: [],
      price: null,
    };

    setFilters(clearedFilters); // Clear the filter state
    applyFilters(clearedFilters); // Update the URL and fetch new data
  };

  const toggleFilter = (filterType: string, value: string | string[]) => {
    let newFilters = { ...filters };

    if (filterType === "tags" || filterType === "categories") {
      if (Array.isArray(value)) {
        newFilters[filterType] = value;
      } else {
        const filterIndex = newFilters[filterType].indexOf(value as string);
        if (filterIndex > -1) {
          newFilters[filterType] = newFilters[filterType].filter(
            (f) => f !== value
          );
        } else {
          newFilters[filterType].push(value as string);
        }
      }
    } else if (filterType === "price") {
      newFilters.price = Array.isArray(value) ? value[0] : value;
    }

    applyFilters(newFilters);
  };

  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading) return;
    fetchItems(page + 1);
  }, [hasMore, loading, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
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

  return (
    <>
      <div className="lg:hidden">
        <Suspense fallback={<div>Loading Filters...</div>}>
          <MobileFilters
            availableTags={itemsData.availableTags}
            activeFilters={filters.tags}
            activeCategories={filters.categories}
            activeCompanies={filters.companies}
            activePriceRange={filters.price as string | null}
            onFilterChange={(tags) => toggleFilter("tags", tags)}
            onCategoryChange={(categories) =>
              toggleFilter("categories", categories)
            }
            onCompanyChange={(companies) =>
              toggleFilter("companies", companies)
            }
            onPriceChange={(price) => toggleFilter("price", price || "")}
            clearFilters={clearFilters}
          />
        </Suspense>
      </div>
      <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
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
            <div className="relative p-6 ring-1 ring-inset ring-neutral-mid rounded-xl mb-6">
              <Sidebar
                availableTags={itemsData.availableTags}
                activeFilters={filters.tags}
                activeCategories={filters.categories}
                activeCompanies={filters.companies}
                activePriceRange={filters.price}
                onFilterChange={(tags) => toggleFilter("tags", tags)}
                onCategoryChange={(categories) =>
                  toggleFilter("categories", categories)
                }
                onCompanyChange={(companies) =>
                  toggleFilter("companies", companies)
                }
                onPriceChange={(price) => toggleFilter("price", price || "")}
              />
            </div>
          </div>
        </aside>

        <div className="lg:col-span-2 xl:col-span-3">
          <Suspense fallback={<div>Loading Items...</div>}>
            {loadedItems.length > 0 ? (
              <ItemList items={loadedItems} />
            ) : (
              <div>No Items to display.</div>
            )}
          </Suspense>
          <div ref={observerRef}></div>
          {loading && <div>Loading more items...</div>}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}
