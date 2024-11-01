import mongoose from "mongoose";
import type { ClothingItemTypes } from "../types/global/types";

const clothingItemSchema = new mongoose.Schema<ClothingItemTypes>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  company: { type: String, required: true },
  tags: { type: [String], required: true },
});

// Add indexes for faster queries
clothingItemSchema.index({ tags: 1, category: 1, company: 1, price: 1 });

const ClothingItem =
  mongoose.models.ClothingItem ||
  mongoose.model("ClothingItem", clothingItemSchema, "mensclothing");

export default ClothingItem;
