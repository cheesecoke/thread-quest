import { OutfitItemTypes } from "../inventory/types";

export interface ClothingItemTypes {
  _id: string;
  name: string;
  price: number;
  category: string;
  company: string;
  imageUrl: string;
  hoverImageUrl?: string;
  link: string;
  tags: string[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  savedItems?: ClothingItemTypes[];
  savedOutfits?: OutfitItemTypes[];
}
