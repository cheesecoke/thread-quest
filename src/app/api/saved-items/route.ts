import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export async function GET() {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ savedItems: [] }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email }).select(
      "savedItems"
    );

    if (!user) {
      return NextResponse.json({ savedItems: [] });
    }

    return NextResponse.json({ savedItems: user?.savedItems || [] });
  } catch (error) {
    console.error("Error fetching saved items:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { savedItems } = await req.json();

    // Update the user's saved items
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { savedItems } }, // Replace the savedItems array
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Items saved successfully",
      savedItems: user.savedItems,
    });
  } catch (error) {
    console.error("Error saving items:", error);
    return NextResponse.json(
      { message: "Failed to save items" },
      { status: 500 }
    );
  }
}
