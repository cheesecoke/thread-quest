"use client";
import dynamic from "next/dynamic";
import React, {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SEOHead from "@/app/components/SEOHead";

// Next.js dynamic imports
const Sidebar = dynamic(() => import("@/app/components/Sidebar"), {
  ssr: false,
});
const ScrollToTopButton = dynamic(
  () => import("@/app/components/ScrollToTopButton"),
  { ssr: false }
);
const ItemList = React.lazy(() => import("@/app/components/ItemList"));
const MobileFilters = React.lazy(
  () => import("@/app/components/MobileFilters")
);

export default function ClothingPage() {
  const [itemsData, setItemsData] = useState({
    initialItems: [],
    totalItemsCount: 0,
    availableTags: [],
  });
  const [loadedItems, setLoadedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
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

  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref for IntersectionObserver
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const query = searchParams;
      const restoredFilters = {
        tags: query.getAll("tags"), // Restores tags from URL
        categories: query.getAll("categories"),
        companies: query.getAll("companies"),
        price: query.get("price"),
      };

      setFilters(restoredFilters);
      fetchItems(1, restoredFilters); // Fetch the items using the restored filters
    }
  }, [searchParams]);

  // Fetch items function
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

  // Apply filters by updating URL and fetching items
  const applyFilters = (newFilters: any) => {
    const query = new URLSearchParams(cleanFilters(newFilters)).toString();
    const url = `${window.location.pathname}?${query}`;
    router.replace(url); // Update URL without page reload
    fetchItems(1, newFilters); // Fetch items with the new filters
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

  // Toggle filter function
  const toggleFilter = (filterType: string, value: string | string[]) => {
    let newFilters = { ...filters };

    if (filterType === "tags" || filterType === "categories") {
      // Allow multiple tags or categories to be selected
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

  // Infinite scroll observer to load more items
  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading) return;
    fetchItems(page + 1);
  }, [hasMore, loading, page]);

  // IntersectionObserver for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { rootMargin: "100px" } // Trigger before reaching the bottom
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
    <Suspense fallback={<div>Loading...</div>}>
      <SEOHead page="clothing" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-start items-center border-b border-neutral-mid pb-10">
          <h1 className="text-4xl font-bold">Men's Clothing</h1>
        </div>

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
                className="text-sm text-accent hover:underline"
              >
                Clear all filters
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-96px)] pb-32">
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
          </aside>

          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <Suspense fallback={<div>Loading Items...</div>}>
              {Array.isArray(loadedItems) && loadedItems.length > 0 ? (
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
      </div>
    </Suspense>
  );
}
