// pages/api/updatePasswordByEmail.js

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    const { email, newPassword } = await req.json();
    await connectMongoDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and set isLoggedIn to false
    await User.findByIdAndUpdate(user._id, { password: hashedPassword, isLoggedIn: false });

    return NextResponse.json({ success: true, message: "Password updated and user logged out." }, { status: 200 });
  } catch (error) {
    console.error("Error updating password and logging out user:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the password." },
      { status: 500 }
    );
  }
}
