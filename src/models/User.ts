// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types/global/types";

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
        hoverImageUrl: { type: String, required: true },
        link: { type: String, required: true },
        tags: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
