
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getGeolocation } from "../../../utilities/getGeolocation";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          const now = new Date();
          const locationData = await getGeolocation(ip);

          // Check if user is already logged in
          if (user.isLoggedIn) {
            return null;
          }

          // Check if it's a new week
          if (!user.weekStartTimestamp || now - new Date(user.weekStartTimestamp) >= 7 * 24 * 60 * 60 * 1000) {
            await User.updateOne(
              { email },
              {
                isLoggedIn: true,
                loginTimestamp: now,
                weekStartTimestamp: now,
                sessionDuration: 0,
                loginLocation: locationData,
              }
            );
          } else {
            await User.updateOne(
              { email },
              {
                isLoggedIn: true,
                loginTimestamp: now,
                loginLocation: locationData,
              }
            );
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt callback:", { token, user });

      if (user) {
        return {
          ...token,
          id: user._id,
          subscription: user.subscription,
          role: user.role,
          location: user.loginLocation
        };
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          subscription: token.subscription,
          role: token.role,
          location: token.loginLocation

        },
      };
    },
    async signOut({ token }) {
      try {
        const response = await fetch("/api/update-isloggedin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: token.email }),
        });
        if (!response.ok) {
          throw new Error("Failed to update logout timestamp.");
        }
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
