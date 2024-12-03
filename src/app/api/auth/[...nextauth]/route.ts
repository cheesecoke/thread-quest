import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/app/utils/connectToDatabase";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          savedItems: [],
        });
      }
      return true;
    },
    async session({ session }: { session: any }) {
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user = {
          ...session.user,
          image: dbUser._id.toString(),
          savedItems: dbUser.savedItems || [],
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
