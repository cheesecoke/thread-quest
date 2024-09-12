// app/api/clothing/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import ClothingItem from "@/models/ClothingItem";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tags = searchParams.get("tags")?.split(",") || [];
    const categories = searchParams.get("categories")?.split(",") || [];
    const companies = searchParams.get("companies")?.split(",") || [];
    const priceRange = {
      "less-50": [0, 50],
      "50-100": [50, 100],
      "100-200": [100, 200],
      "200-500": [200, 500],
      "more-500": [500, Infinity],
    };
    const price =
      (searchParams.get("price") as keyof typeof priceRange) || null;
    const page = Number(searchParams.get("page")) || 1;

    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI!);

    // Prepare the filter object
    const filter: any = {};

    if (tags.length) filter.tags = { $in: tags };
    if (categories.length) filter.category = { $in: categories };
    if (companies.length) filter.company = { $in: companies };
    if (price) {
      if (price) {
        filter.price = {
          $gte: priceRange[price][0],
          $lte: priceRange[price][1],
        };
      }
    }

    // Pagination
    const limit = 16;
    const skip = (page - 1) * limit;

    // Fetch items from DB
    const items = await ClothingItem.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
    const totalItemsCount = await ClothingItem.countDocuments(filter).exec();

    return NextResponse.json({ items, totalItemsCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
