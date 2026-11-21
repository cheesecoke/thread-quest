import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/app/utils/connectToDatabase";
import { getSessionEmail } from "@/app/utils/getSessionEmail";

export async function POST(req: Request) {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const body = await req.json();
  const { item, action } = body;

  if (!item || !action) {
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
