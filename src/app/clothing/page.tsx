import React, { Suspense } from "react";
import SEOHead from "@/app/components/SEOHead";
import dynamic from "next/dynamic";

// Dynamic import of the client-side component
const ClothingClient = dynamic(
  () => import("@/app/clothing/components/ClothingClient"),
  { ssr: false }
);

// This page is rendered on the server
export default async function ClothingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SEOHead page="clothing" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        {/* Render client-side logic */}
        <ClothingClient />
      </div>
    </Suspense>
  );
}
