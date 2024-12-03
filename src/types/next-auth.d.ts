import NextAuth from "next-auth";
import { ClothingItemTypes, IUser } from "./global/types";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      savedItems: ClothingItemTypes[];
    };
  }

  interface User extends IUser {}
}
