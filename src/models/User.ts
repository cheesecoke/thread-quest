// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types/global/types";

const OutfitSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  items: { type: Array, required: true },
  dueDate: { type: String, required: true },
  dueDateTime: { type: String, required: true },
  status: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    savedItems: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        company: { type: String, required: true },
        imageUrl: { type: String, required: true },
        hoverImageUrl: { type: String },
        link: { type: String, required: true },
        tags: [{ type: String }],
      },
    ],
    savedOutfits: { type: [OutfitSchema] },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
