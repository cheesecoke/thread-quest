// src/config/content.ts
// layout.tsx sets the default SEO, Change the default there.
export const content = {
  hero: {
    title: "Curated Fashion from our Favorite Brands",
    subtitle:
      "ThreadQuest is a curated online clothing store offering a unique shopping experience for fashion. Discover and save high-quality clothing items from carefully curated brands, organized by where they are worn on the body. Explore stylish outfits and elevate your wardrobe with a simple, sleek interface. Start your fashion exploration today with ThreadQuest!",
  },
  seo: {
    clothing: {
      title: "Clothing Collection - ThreadQuest",
      description:
        "Browse our selection of high-quality clothing, sorted by tops, bottoms, and outerwear.",
    },
    inventory: {
      title: "Inventory Outfit - ThreadQuest",
      description:
        "Browse and create outfits from your inventory of clothing items.",
    },
  },
};

export const categories = [
  {
    id: "company",
    name: "Company",
    tags: ["Roark", "Passenger"],
  },
  {
    id: "bottoms",
    name: "Bottoms",
    tags: ["pants", "shorts"],
  },
  {
    id: "tops",
    name: "Tops",
    tags: [
      "shirts",
      "polos",
      "sweaters",
      "hoodies",
      "t-shirts",
      "short sleeves",
      "long sleeves",
      "thermals",
      "flannels",
    ],
  },
  {
    id: "outerwear",
    name: "Outerwear",
    tags: ["jackets", "pullovers", "coats"],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    tags: ["hats", "belts", "bags"],
  },
];

export const priceRanges = {
  "less-50": [0, 50],
  "50-100": [50, 100],
  "100-200": [100, 200],
  "200-500": [200, 500],
  "more-500": [500, Infinity],
};
