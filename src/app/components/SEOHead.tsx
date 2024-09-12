import Head from "next/head";
import content from "@/config/content";

const SEOHead = ({ page }: { page: "clothing" }) => {
  return (
    <Head>
      <title>{content.seo[page].title}</title>
      <meta name="description" content={content.seo[page].description} />
    </Head>
  );
};

export default SEOHead;
