// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";

// export async function POST(req, res) {
//   console.log("Received POST request to update isLoggedIn");

//   if (req.method === "POST") {
//     const { email, isLoggedIn } = req.body;

//     console.log("Request body:", req.body);

//     try {
//       console.log("Connecting to MongoDB...");
//       await connectMongoDB();
//       console.log("Updating isLoggedIn...");
//       await User.updateOne({ email }, { isLoggedIn: false });

//       console.log("Update successful");
//       // Return successful response
//       return { success: true };
//     } catch (error) {
//       console.error("Error updating isLoggedIn:", error);
//       // Return error response with status code handled by Next.js
//       return { success: false, message: "Internal Server Error" };
//     }
//   } else {
//     console.log("Method Not Allowed");
//     // Return error response with status code handled by Next.js
//     return { success: false, message: "Method Not Allowed" };
//   }
// }
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req, res) {
  console.log("Received POST request to update isLoggedIn");

  if (req.method === "POST") {
    const { email, isLoggedIn } = req.body;

    console.log("Request body:", req.body); // Existing log

    console.log("Extracted email:", email);
    console.log("Extracted isLoggedIn:", isLoggedIn);

    try {
      console.log("Connecting to MongoDB...");
      await connectMongoDB();
      console.log("Updating isLoggedIn...");

      // console.log("request is", await req.json())

      
      // const { email, isLoggedIn } = await req.json()
      // console.log("email was is", email)

      const responseBody = await req.json();
      console.log("request is", responseBody)
            const { email, isLoggedIn } = responseBody







    //  await User.findOneAndUpdate(
    //     { email },
    //     { isLoggedIn: false },
    //     { new: true, upsert: false }
    //   );  

    await User.updateOne({ email }, { $set: { isLoggedIn } });

  
      console.log("Update successful");
      // Return successful response
      return { success: true };
    } catch (error) {
      console.error("Error updating isLoggedIn:", error);
      // Return error response with status code handled by Next.js
      return { success: false, message: "Internal Server Error" };
    }
  } else {
    console.log("Method Not Allowed");
    // Return error response with status code handled by Next.js
    return { success: false, message: "Method Not Allowed" };
  }
}
