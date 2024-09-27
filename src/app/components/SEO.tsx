// src/app/components/SEO.tsx
import { Metadata } from "next";
import { content } from "@/config/content";

// The type of page you expect: could be extended later for more pages
type SEOProps = {
  page: "clothing" | "inventory";
};

// Component for dynamic metadata
export function generateMetadata({ page }: SEOProps): Metadata {
  const seoData = content.seo[page];

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
    },
  };
}
