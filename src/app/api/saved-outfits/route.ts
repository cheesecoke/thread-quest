import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import { OutfitItemTypes } from "@/types/inventory/types";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  // Extract query parameters from the request URL
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { email, outfit } = await req.json();

  if (!email || !outfit) {
    return new NextResponse("Invalid request payload", { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const isDuplicate = user.savedOutfits.some(
    (savedOutfit: OutfitItemTypes) => savedOutfit.id === outfit.id
  );

  if (isDuplicate) {
    user.savedOutfits = user.savedOutfits.map((savedOutfit: OutfitItemTypes) =>
      savedOutfit.id === outfit.id ? outfit : savedOutfit
    );
  } else {
    user.savedOutfits.push(outfit);
  }

  await user.save();

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const { email, outfitId } = await req.json();

  if (!email || !outfitId) {
    return new NextResponse("Invalid request payload", { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  user.savedOutfits = user.savedOutfits.filter(
    (savedOutfit: OutfitItemTypes) => savedOutfit.id !== outfitId
  );

  await user.save();

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}

export async function PATCH(req: NextRequest) {
  await connectToDatabase();

  const { id, status } = await req.json();

  if (!id || !status) {
    return new NextResponse("Invalid request payload", { status: 400 });
  }

  const user = await User.findOne({ "savedOutfits.id": id });

  if (!user) {
    return new NextResponse("Outfit not found", { status: 404 });
  }

  user.savedOutfits = user.savedOutfits.map((savedOutfit: OutfitItemTypes) =>
    savedOutfit.id === id ? { ...savedOutfit, status } : savedOutfit
  );

  await user.save();

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const { email, outfitId, newName } = await req.json();

  if (!email || !outfitId || !newName) {
    return new NextResponse("Invalid request payload", { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const outfitIndex = user.savedOutfits.findIndex(
    (savedOutfit: OutfitItemTypes) => savedOutfit.id === outfitId
  );

  if (outfitIndex === -1) {
    return new NextResponse("Outfit not found", { status: 404 });
  }

  user.savedOutfits[outfitIndex].name = newName;
  // Needed to mark the document as modified to trigger the save operation
  user.markModified("savedOutfits");

  await user.save();

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}
