import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import ClothingItem from "@/models/ClothingItem";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tags = searchParams.get("tags")?.split(",") || [];
    const categories = searchParams.get("categories")?.split(",") || [];
    const companies = searchParams.get("companies")?.split(",") || [];

    // Define price ranges
    const priceRanges = {
      "less-50": [0, 50],
      "50-100": [50, 100],
      "100-200": [100, 200],
      "200-500": [200, 500],
      "more-500": [500, Infinity],
    };

    // Parse the prices query parameter
    const price =
      (searchParams.get("prices") as keyof typeof priceRanges) || null;
    const page = Number(searchParams.get("page")) || 1;

    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI!);

    const test = await ClothingItem.find({ price: { $type: "number" } });

    // Prepare the filter object
    const filter: any = {};

    if (tags.length) filter.tags = { $in: tags };
    if (categories.length) filter.category = { $in: categories };
    if (companies.length) filter.company = { $in: companies };

    if (price) {
      filter.price = {
        $gte: priceRanges[price][0],
        $lte: priceRanges[price][1],
      };
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
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
