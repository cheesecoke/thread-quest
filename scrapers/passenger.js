const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the schema and model for clothing items
const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  hoverImageUrl: { type: String },
  link: { type: String, required: true },
  company: { type: String, required: true },
  tags: { type: [String], required: true },
});

const ClothingItem = mongoose.model(
  "ClothingItem",
  clothingItemSchema,
  "mensclothing" // MongoDB collection name
);

// Helper function to scroll the page
const scrollPage = async (page) => {
  let previousHeight;
  try {
    while (true) {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await new Promise((resolve) => setTimeout(resolve, 100000)); // Wait for new items to load
      const newHeight = await page.evaluate("document.body.scrollHeight");
      if (newHeight === previousHeight) break; // Exit if no more content
    }
  } catch (e) {
    console.log("Scrolling failed:", e.message);
  }
};

// Categorize and tag the clothing items based on the name
const categorizeAndTagItem = (name) => {
  const tags = [];
  let mainCategory = "";

  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("shirt") ||
    lowerName.includes("tee") ||
    lowerName.includes("polo") ||
    lowerName.includes("sweater") ||
    lowerName.includes("hoodie") ||
    lowerName.includes("top") ||
    lowerName.includes("pullover")
  ) {
    mainCategory = "Tops";
    if (lowerName.includes("long sleeve")) tags.push("long sleeve");
    if (lowerName.includes("flannel")) tags.push("flannel");
    if (lowerName.includes("short sleeve")) tags.push("short sleeve");
    if (lowerName.includes("t-shirt") || lowerName.includes("tee"))
      tags.push("t-shirt");
    if (lowerName.includes("polo")) tags.push("polos");
    if (lowerName.includes("shirt")) tags.push("shirts");
    if (lowerName.includes("hoodie")) tags.push("hoodies");
    if (lowerName.includes("sweater")) tags.push("sweaters");
    if (lowerName.includes("cardigan")) tags.push("cardigans");
    if (lowerName.includes("pullover")) tags.push("pullovers");
  } else if (
    lowerName.includes("pant") ||
    lowerName.includes("short") ||
    lowerName.includes("chino") ||
    lowerName.includes("jean") ||
    lowerName.includes("slack")
  ) {
    mainCategory = "Bottoms";
    if (lowerName.includes("short")) tags.push("shorts");
    if (lowerName.includes("pant")) tags.push("pants");
    if (lowerName.includes("chino")) tags.push("chinos");
    if (lowerName.includes("jean")) tags.push("jeans");
    if (lowerName.includes("slack")) tags.push("slacks");
  } else if (lowerName.includes("jacket") || lowerName.includes("coat")) {
    mainCategory = "Outerwear";
    if (lowerName.includes("jacket")) tags.push("jackets");
    if (lowerName.includes("coat")) tags.push("coats");
  } else if (lowerName.includes("hat") || lowerName.includes("belt")) {
    mainCategory = "Accessories";
    if (lowerName.includes("hat")) tags.push("hats");
    if (lowerName.includes("belt")) tags.push("belts");
  } else {
    mainCategory = "Miscellaneous";
  }

  return { mainCategory, tags };
};

(async () => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const company = {
    name: "Passenger",
    url: "https://us.passenger-clothing.com/collections/mens?sort=title%7Easc&pg=4",
  };

  await page.goto(company.url, { waitUntil: "networkidle2", timeout: 120000 });

  // Scroll the page to load all products
  await scrollPage(page);

  // Extract product data
  const items = await page.evaluate(() => {
    const productItems = Array.from(document.querySelectorAll("card-product"));

    return productItems
      .map((item) => {
        const name = item.querySelector(".card__heading")?.innerText || "";
        const priceText =
          item.querySelector(".price-item--last")?.innerText || "";
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        const link = item.querySelector("a.card-product-link")?.href || "";
        const imageUrl =
          item.querySelector(".product__media-item img")?.src || "";
        const hoverImageUrl =
          item.querySelectorAll(".product__media-item img")[1]?.src || "";

        return { name, price, imageUrl, hoverImageUrl, link };
      })
      .filter((item) => item.name && item.price && item.link);
  });

  const categorizedItems = items.map((item) => {
    const { mainCategory, tags } = categorizeAndTagItem(item.name);
    return { ...item, category: mainCategory, tags };
  });

  console.log("Categorized items:", categorizedItems);

  if (categorizedItems.length > 0) {
    await ClothingItem.insertMany(
      categorizedItems.map((item) => ({ ...item, company: company.name }))
    );
    console.log(
      "Passenger clothing data has been saved to the mensclothing collection in MongoDB."
    );
  } else {
    console.log("No items to save.");
  }

  await browser.close();
  mongoose.connection.close();
})();
