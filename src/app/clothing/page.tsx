import React, { Suspense } from "react";
import SEOHead from "@/app/components/SEOHead";
import dynamic from "next/dynamic";

// Dynamic import of the client-side component
const ClothingClient = dynamic(
  () => import("@/app/components/ClothingClient"),
  { ssr: false }
);

// This page is rendered on the server
export default async function ClothingPage() {
  // Fetching data directly within the server component
  const res = await fetch(`${process.env.API_URL}/api/clothing?page=1`);
  const itemsData = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SEOHead page="clothing" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-start items-center border-b border-neutral-mid pb-10">
          <h1 className="text-4xl font-bold">Men's Clothing</h1>
        </div>
        {/* Render client-side logic */}
        <ClothingClient itemsData={itemsData} />
      </div>
    </Suspense>
  );
}
