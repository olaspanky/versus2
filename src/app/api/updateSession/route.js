// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, timeSpent } = await req.json();
//     await connectMongoDB();

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
//     }

//     const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

//     const todayEntry = user.sessionDurations.find(entry => entry.date === today);

//     if (todayEntry) {
//       // Update the existing entry
//       todayEntry.duration += timeSpent;
//     } else {
//       // Add a new entry for today
//       user.sessionDurations.push({ date: today, duration: timeSpent });
//     }

//     await user.save();

//     return NextResponse.json({ success: true, message: "Session duration updated successfully." }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating session duration:", error);
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the session duration." },
//       { status: 500 }
//     );
//   }
// }

// import User from "@/models/user";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, timeSpent } = await req.json();
//     await connectMongoDB();

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
//     }

//     // Update the duration directly
//     user.sessionDurations.push({ duration: timeSpent });

//     await user.save();

//     return NextResponse.json({ success: true, message: "Session duration updated successfully." }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating session duration:", error);
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the session duration." },
//       { status: 500 }
//     );
//   }
// }

// pages/api/updateSessionDuration.jsimport { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, timeSpent } = await req.json();
//     await connectMongoDB();

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
//     }

//     // Ensure user.sessionDurations is initialized
//     if (!user.sessionDurations) {
//       user.sessionDurations = [];
//     }

//     // Calculate today's date without time (to store data per day)
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Find if there's already an entry for today
//     let sessionEntry = user.sessionDurations.find(
//       (entry) => entry.date && new Date(entry.date).getTime() === today.getTime()
//     );

//     if (!sessionEntry) {
//       // If no entry exists, create a new one
//       sessionEntry = { date: today, duration: 0 };
//       user.sessionDurations.push(sessionEntry);
//     }

//     // Update the duration for today
//     sessionEntry.duration += timeSpent;

//     // Save the updated user document
//     await user.save();

//     return NextResponse.json({ success: true, message: "Session duration updated successfully." }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating session duration:", error);
//     return NextResponse.json(
//       { success: false, message: "An error occurred while updating the session duration." },
//       { status: 500 }
//     );
//   }
// }
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, timeSpent } = await req.json();

    // Ensure timeSpent is a valid number
    if (isNaN(timeSpent) || timeSpent < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid timeSpent value." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Ensure user.sessionDurations is initialized
    if (!user.sessionDurations) {
      user.sessionDurations = [];
    }

    // Calculate today's date without time (to store data per day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Update sessionDurations to ensure each entry has a date
    user.sessionDurations = user.sessionDurations.map(entry => {
      if (!entry.date) {
        entry.date = new Date();
        entry.date.setHours(0, 0, 0, 0);
      }
      return entry;
    });

    // Find if there's already an entry for today
    let sessionEntry = user.sessionDurations.find(
      (entry) => new Date(entry.date).getTime() === today.getTime()
    );

    if (!sessionEntry) {
      // If no entry exists, create a new one
      sessionEntry = { date: today, duration: 0 };
      user.sessionDurations.push(sessionEntry);
    }

    // Ensure sessionEntry.duration is a valid number
    if (isNaN(sessionEntry.duration)) {
      sessionEntry.duration = 0;
    }

    // Update the duration for today
    sessionEntry.duration += timeSpent;

    // Save the updated user document
    await user.save();

    return NextResponse.json({ success: true, message: "Session duration updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error updating session duration:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the session duration." },
      { status: 500 }
    );
  }
}
