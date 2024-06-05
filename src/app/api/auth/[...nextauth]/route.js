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

//           // Check if user is already logged in
//           if (user.isLoggedIn) {
//             return null;
//           }

//           // Update isLoggedIn to true since the user is logging in
//           await User.updateOne({ email }, { isLoggedIn: true });

//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     callbacks: {
//       async jwt(token, user) {
//         if (user) {
//           token.isLoggedIn = true;
//         } else {
//           token.isLoggedIn = false;
//         }
//         return token;
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
//   callbacks: {
//     async signOut({ email }) {
//       try {
//         await fetch("/api/update-isloggedin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });
//       } catch (error) {
//         console.error("Error logging out: ", error);
//       }
//     },
//   },

  
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


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

//           // Check if user is already logged in
//           if (user.isLoggedIn) {
//             return null;
//           }

//           // Update isLoggedIn to true since the user is logging in
//           await User.updateOne({ email }, { isLoggedIn: true });

//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//         }
//       },
//     }),
//   ],
  

//     callbacks: {
//       async jwt({token, user, session}) {
//         console.log("jwt callback:",{token, user, session} )
        
//         if (user) {
//           return {
//             ...token,
//             id: user._id,
//             prescription : user.prescription
//           }
//         } 
//         return token;
//       },
//       async session({ token, user, session }) {
//         return{
//           ...session,
//           user: {
//             ...session.user,
//             id: token._id,
//             prescription: token.prescription
//           }

//         };
       
//         return session 
//       },
//     },
  
//   secret: process.env.NEXTAUTH_SECRET,
//   session:{
//     strategy: "jwt",
//   },
  
//   pages: {
//     signIn: "/",
//   },
//   callbacks: {
//     async signOut({ email }) {
//       try {
//         await fetch("/api/update-isloggedin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });
//       } catch (error) {
//         console.error("Error logging out: ", error);
//       }
//     },
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
        const { email, password } = credentials;

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

          // Check if user is already logged in
          if (user.isLoggedIn && !passwordsMatch) {
            // Return null to prevent login and throw an error message
            throw new Error("You are already logged in on another device or tab.");
          }
          if (user.isLoggedIn) {
            return null;

          }

          // Update isLoggedIn to true since the user is logging in
          await User.updateOne({ email }, { isLoggedIn: true });

          return user;
        } catch (error) {
          console.log("Error: ", error);
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
        },
      };
    },
    async signOut({ email }) {
      try {
        await fetch("/api/update-isloggedin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
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


// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

// console.log("NextAuth configuration started.");

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         console.log("authorize function called.");
        
//         const { email, password } = credentials;

//         try {
//           console.log("Connecting to MongoDB...");
//           await connectMongoDB();

//           console.log("Fetching user from database...");
//           const user = await User.findOne({ email });

//           if (!user) {
//             console.log("User not found.");
//             return null;
//           }

//           console.log("Checking passwords...");
//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (!passwordsMatch) {
//             console.log("Passwords do not match.");
//             return null;
//           }

//           console.log("Checking user login status and fingerprint...");
//           if (user.isLoggedIn && user.fingerprint) {
//             const fp = await FingerprintJS.load();
//             const currentFingerprint = await fp.get();

//             if (currentFingerprint.visitorId !== user.fingerprint) {
//               console.log("Fingerprints do not match.");
//               return null;
//             }
//           }

//           console.log("Generating browser fingerprint...");
//           const fp = await FingerprintJS.load();
//           const fingerprint = await fp.get();

//           console.log("Updating user login status and fingerprint...");
//           await User.updateOne({ email }, {
//             isLoggedIn: true,
//             fingerprint: fingerprint.visitorId,
//           });

//           console.log("User logged in successfully.");
//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     callbacks: {
//       async jwt(token, user) {
//         if (user) {
//           token.isLoggedIn = true;
//         } else {
//           token.isLoggedIn = false;
//         }
//         return token;
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
//   callbacks: {
//     async signOut({ email }) {
//       try {
//         console.log("Logging out...");
//         await fetch("/api/update-isloggedin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });
//       } catch (error) {
//         console.error("Error logging out: ", error);
//       }
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

