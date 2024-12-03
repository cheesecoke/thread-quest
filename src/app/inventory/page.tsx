// app/inventory/page.tsx (Server Component)
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { SavedItemsProvider } from "@/context/SavedItemsContext";
import { generateMetadata } from "../components/SEO";

export const metadata = generateMetadata({ page: "inventory" });

// Dynamic import of the client-side component
const InventoryClient = dynamic(
  () => import("@/app/inventory/components/InventoryClient"),
  { ssr: false }
);

export default async function InventoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <InventoryClient />
      </div>
    </Suspense>
  );
}
