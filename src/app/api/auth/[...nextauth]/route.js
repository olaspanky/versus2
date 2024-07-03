// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (!passwordsMatch) {
//             return null;
//           }

//           if (user.isLoggedIn) {
//             throw new Error("You are already logged in on another device or tab.");
//           }

//           await User.updateOne({ email }, { isLoggedIn: true });

//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user._id,
//           subscription: user.subscription,
//           role: user.role,
//         };
//       }
//       return token;
//     },
//     async session({ token, session }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           subscription: token.subscription,
//           role: token.role,
//         },
//       };
//     },
//     async signOut({ token }) {
//       try {
//         await connectMongoDB();
//         await User.updateOne({ email: token.email }, { isLoggedIn: false });
//       } catch (error) {
//         console.error("Error logging out: ", error);
//       }
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, deviceId } = credentials;
        console.log(`Received credentials: email=${email}, deviceId=${deviceId}`);

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(`User found: ${user}`);

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(`Passwords match: ${passwordsMatch}`);

          if (!passwordsMatch) {
            console.log("Passwords do not match");
            return null;
          }
           // Update deviceId if it is null or different from the provided deviceId
           if (!user.deviceId || user.deviceId !== deviceId) {
            console.log(`Updating deviceId from ${user.deviceId} to ${deviceId}`);
            await User.updateOne({ email }, { deviceId });
          }

          // Check if user is already logged in on another device
          if (user.deviceId && user.deviceId !== deviceId) {
            console.log(`User already logged in on another device: ${user.deviceId}`);
            throw new Error("You are already logged in on another device.");
          }

         

          return { ...user.toObject(), deviceId };
        } catch (error) {
          console.log("Error in authorize function: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          subscription: user.subscription,
          role: user.role,
          deviceId: user.deviceId,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.subscription = token.subscription;
      session.user.role = token.role;
      session.user.deviceId = token.deviceId;
      return session;
    },
    async signOut({ token }) {
      try {
        await connectMongoDB();
        await User.updateOne({ email: token.email }, { deviceId: null });
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
