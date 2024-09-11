import dynamic from "next/dynamic";
import React, {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import mongoose from "mongoose";
import ClothingItem from "@/models/ClothingItem";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

// Next.js dynamic imports
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const ScrollToTopButton = dynamic(
  () => import("@/components/ScrollToTopButton"),
  {
    ssr: false,
  }
);

// React.lazy components
const ItemList = React.lazy(() => import("@/components/ItemList"));
const MobileFilters = React.lazy(() => import("@/components/MobileFilters"));

let isConnected = false;
const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGODB_URI!, {});
    isConnected = true;
  }
};

const Clothing: React.FC<{
  initialItems: any[];
  totalItemsCount: number;
  availableTags: string[];
}> = ({ initialItems, totalItemsCount, availableTags }) => {
  const router = useRouter();
  const [loadedItems, setLoadedItems] = useState(initialItems || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialItems.length < totalItemsCount);
  const [filters, setFilters] = useState({
    tags: Array.isArray(router.query.tags)
      ? router.query.tags
      : router.query.tags
      ? router.query.tags.split(",")
      : [],
    categories: Array.isArray(router.query.categories)
      ? router.query.categories
      : router.query.categories
      ? router.query.categories.split(",")
      : [],
    companies: Array.isArray(router.query.companies)
      ? router.query.companies
      : router.query.companies
      ? router.query.companies.split(",")
      : [],
    price: Array.isArray(router.query.price)
      ? router.query.price[0]
      : router.query.price || null,
  });

  // Cache to store loaded items
  const itemCache = useRef<{ [key: string]: any[] }>({});

  const generateCacheKey = (filters: any, page: number) => {
    return `${JSON.stringify(filters)}|page:${page}`;
  };

  const cleanFilters = (filters: any) => {
    const cleanedFilters = { ...filters };
    Object.keys(cleanedFilters).forEach((key) => {
      if (
        Array.isArray(cleanedFilters[key]) &&
        cleanedFilters[key].length === 0
      ) {
        delete cleanedFilters[key];
      } else if (!cleanedFilters[key]) {
        delete cleanedFilters[key];
      }
    });
    return cleanedFilters;
  };

  const fetchItems = useCallback(
    async (newPage = 1, appliedFilters = filters) => {
      setLoading(true);
      const cacheKey = generateCacheKey(appliedFilters, newPage);

      if (itemCache.current[cacheKey]) {
        const cachedItems = itemCache.current[cacheKey];
        if (newPage === 1) {
          setLoadedItems(cachedItems);
        } else {
          setLoadedItems((prev) => [...prev, ...cachedItems]);
        }
      } else {
        const query = new URLSearchParams(
          cleanFilters({
            ...appliedFilters,
            page: String(newPage),
          })
        );

        const res = await fetch(`/api/items?${query.toString()}`);
        const { items } = await res.json();

        if (newPage === 1) {
          setLoadedItems(items || []);
        } else {
          setLoadedItems((prev) => [...prev, ...(items || [])]);
        }

        // Cache the loaded items
        itemCache.current[cacheKey] = items;

        if (items.length === 0 || items.length < 16) {
          setHasMore(false);
        }
      }

      setPage(newPage);
      setLoading(false);
    },
    [filters]
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset page to 1 when filters change
    setHasMore(true); // Allow loading more items after filters change
    fetchItems(1, newFilters);

    const query = new URLSearchParams(cleanFilters(newFilters));

    router.push({
      pathname: router.pathname,
      query: query.toString(),
    });
  };

  const toggleFilter = (filterType: string, value: string | string[]) => {
    console.log("value", value);
    console.log("filterType", filterType);
    let newFilters: {
      tags: string[];
      categories: string[];
      companies: string[];
      price: string | null;
    } = { ...filters };
    console.log("newFilters", newFilters);

    if (
      filterType === "tags" ||
      filterType === "categories" ||
      filterType === "companies"
    ) {
      const filterIndex = newFilters[filterType].indexOf(value as string);
      console.log("filterIndex", filterIndex);
      if (filterIndex > -1) {
        newFilters[filterType] = newFilters[filterType].filter(
          (f) => f !== value
        );
      } else {
        if (Array.isArray(value)) {
          newFilters[filterType].push(...value);
        } else {
          newFilters[filterType].push(value);
        }
      }
    } else if (filterType === "price") {
      newFilters.price = Array.isArray(value) ? value[0] : value;
    }

    handleFilterChange(newFilters);
  };

  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading) return;
    fetchItems(page + 1);
  }, [page, hasMore, loading, fetchItems]);

  // Use Intersection Observer instead of scroll event
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { rootMargin: "100px" } // Trigger 100px before the end of the page
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
  }, [loading, hasMore, loadMoreItems]);

  return (
    <>
      <SEOHead page="clothing" />
      <NavBar />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-start items-center border-b border-neutral-mid pb-10">
          <h1 className="text-4xl font-bold">Men's Clothing</h1>
        </div>

        <div className="lg:hidden">
          <Suspense fallback={<div>Loading Filters...</div>}>
            <MobileFilters
              availableTags={availableTags}
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
              clearFilters={() =>
                handleFilterChange({
                  tags: [],
                  categories: [],
                  companies: [],
                  price: null,
                })
              }
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
                onClick={() =>
                  handleFilterChange({
                    tags: [],
                    categories: [],
                    companies: [],
                    price: null,
                  })
                }
                className="text-sm text-accent hover:underline"
              >
                Clear all filters
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-96px)] pb-32">
              <Sidebar
                availableTags={availableTags}
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
      </main>
      <Footer />
    </>
  );
};

let cachedTags: string[] | null = null;
let cachedItemCount: number | null = null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await connectToDatabase();

    const [initialItems, itemCount, tags] = await Promise.all([
      ClothingItem.find({}, "name price category imageUrl link company")
        .limit(16)
        .exec(),
      cachedItemCount
        ? Promise.resolve(cachedItemCount)
        : ClothingItem.countDocuments(),
      cachedTags ? Promise.resolve(cachedTags) : ClothingItem.distinct("tags"),
    ]);

    if (!cachedItemCount) cachedItemCount = itemCount;
    if (!cachedTags) cachedTags = tags;

    const availableTags = cachedTags?.filter((tag) => tag !== undefined) || [];

    return {
      props: {
        initialItems: JSON.parse(JSON.stringify(initialItems)) || [],
        totalItemsCount: cachedItemCount || 0,
        availableTags,
      },
    };
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return {
      props: {
        initialItems: [],
        totalItemsCount: 0,
        availableTags: [],
      },
    };
  }
};

export default Clothing;
