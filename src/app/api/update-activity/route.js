// pages/api/update-activity.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      await connectMongoDB();
      await User.updateOne(
        { email },
        { lastActivityTimestamp: new Date() }
      );
      res.status(200).json({ message: "Activity updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating activity", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
