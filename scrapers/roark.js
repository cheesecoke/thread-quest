const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the schema and model directly within the file
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
  "mensclothing" // Updated collection name to "mensclothing"
);

const scrollPage = async (page) => {
  let previousHeight;
  try {
    while (true) {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await new Promise((resolve) => setTimeout(resolve, 120000)); // Small delay to allow content to load
      const newHeight = await page.evaluate("document.body.scrollHeight");
      if (newHeight === previousHeight) break; // Stop if no more content is loaded
    }
  } catch (e) {
    console.log("Reached the end of the page or scroll failed:", e.message);
  }
};

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
    if (lowerName.includes("top")) tags.push("tops");
    if (lowerName.includes("hoodie")) tags.push("hoodies");
    if (lowerName.includes("sweater")) tags.push("sweaters");
    if (lowerName.includes("cardigan")) tags.push("cardigans");
    if (lowerName.includes("sweatshirt")) tags.push("sweatshirts");
    if (lowerName.includes("pullover")) tags.push("pullovers");
  } else if (
    lowerName.includes("pant") ||
    lowerName.includes("short") ||
    lowerName.includes("trunk") ||
    lowerName.includes("chino") ||
    lowerName.includes("jean") ||
    lowerName.includes("slack")
  ) {
    mainCategory = "Bottoms";
    if (lowerName.includes("trunk")) tags.push("trunks");
    if (lowerName.includes("short")) tags.push("shorts");
    if (lowerName.includes("board short")) tags.push("board shorts");
    if (lowerName.includes("pant")) tags.push("pants");
    if (lowerName.includes("sweatpant")) tags.push("sweatpants");
    if (lowerName.includes("chino")) tags.push("chinos");
    if (lowerName.includes("jean")) tags.push("jeans");
    if (lowerName.includes("slack")) tags.push("slacks");
  } else if (
    lowerName.includes("jacket") ||
    lowerName.includes("vest") ||
    lowerName.includes("coat")
  ) {
    mainCategory = "Outerwear";
    if (lowerName.includes("jacket")) tags.push("jackets");
    if (lowerName.includes("vest")) tags.push("vests");
    if (lowerName.includes("coat")) tags.push("coats");
  } else if (
    lowerName.includes("hat") ||
    lowerName.includes("belt") ||
    lowerName.includes("dress")
  ) {
    mainCategory = "Miscellaneous";
    if (lowerName.includes("hat")) tags.push("hats");
    if (lowerName.includes("belt")) tags.push("belts");
    if (lowerName.includes("dress")) tags.push("dresses");
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
    name: "Roark",
    url: "https://roark.com/collections/shop-all-mens",
  };

  await page.goto(company.url, { waitUntil: "networkidle2", timeout: 200000 });

  // Scroll to the bottom to load all items
  await scrollPage(page);

  const items = await page.evaluate(() => {
    const productItems = Array.from(document.querySelectorAll("article"));

    return productItems
      .map((item) => {
        const name =
          item.querySelector(".product-item__title")?.innerText || "";
        const priceText =
          item.querySelector(".product-item__price")?.innerText || "";
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        const link = item.querySelector("a")?.href || "";
        const imageUrl = item.querySelector(".product-item__image")?.src || "";
        const hoverImageUrl =
          item.querySelector(".product-item__hover-image")?.src || "";

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
      "Roark data has been saved to the mensclothing collection in MongoDB"
    );
  } else {
    console.log("No items to save");
  }

  await browser.close();
  mongoose.connection.close();
})();
