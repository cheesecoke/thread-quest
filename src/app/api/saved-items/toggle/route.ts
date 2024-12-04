import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/app/utils/connectToDatabase";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const { email, item, action } = body;

  if (!email || !item || !action) {
    return NextResponse.json(
      { message: "Invalid request payload" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (action === "add") {
    const exists = user.savedItems.some(
      (savedItem: any) => savedItem._id === item._id
    );
    if (!exists) user.savedItems.push(item);
  } else if (action === "remove") {
    user.savedItems = user.savedItems.filter(
      (savedItem: any) => savedItem._id !== item._id
    );
  }

  await user.save();

  return NextResponse.json({ savedItems: user.savedItems });
}
