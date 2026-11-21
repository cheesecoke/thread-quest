import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import { OutfitItemTypes } from "@/types/inventory/types";
import { getSessionEmail } from "@/app/utils/getSessionEmail";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json({ savedOutfits: user.savedOutfits });
}

export async function POST(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const { outfit } = await req.json();

  if (!outfit) {
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
  const email = await getSessionEmail();
  if (!email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const { outfitId } = await req.json();

  if (!outfitId) {
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
  const email = await getSessionEmail();
  if (!email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const { id, status } = await req.json();

  if (!id || !status) {
    return new NextResponse("Invalid request payload", { status: 400 });
  }

  // Only match an outfit that belongs to the signed-in user
  const user = await User.findOne({ email, "savedOutfits.id": id });

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
  const email = await getSessionEmail();
  if (!email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const { outfitId, newName } = await req.json();

  if (!outfitId || !newName) {
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
