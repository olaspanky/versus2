import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export  async function POST(res) {
 
  try {
    await connectMongoDB();

    // ... Your existing logic for handling POST requests (assuming they update sessions)
    if (req.method === 'POST') {
      const users = await User.find({ isLoggedIn: true });
      const now = new Date();

      const updates = users.map(async (user) => {
        const lastActivity = new Date(user.lastActivityTimestamp);
        const diffMinutes = Math.floor((now - lastActivity) / (1000 * 60));

        if (diffMinutes > 10) { // Consider user inactive if no activity for 10 minutes
          await User.updateOne(
            { email: user.email },
            {
              $inc: { sessionDuration: diffMinutes },
              isLoggedIn: false,
              logoutTimestamp: now,
            }
          );
        }
      });

      await Promise.all(updates);
      res.status(200).json({ message: "Inactive sessions checked" });
    } else { // Optional: Handle GET method appropriately
      // ... Add logic for handling GET requests (if necessary)
      res.status(200).json({ message: 'This endpoint only accepts POST requests for updating sessions.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking inactive sessions", error });
  }
}
