// controllers/leaderboard.controller.js
import fs from "fs/promises";

export const leaderboardController = async (req, res) => {
  try {
    const resultJSON = await fs.readFile("./db.json", "utf-8");
    const data = JSON.parse(resultJSON);

    // Extract users, their usernames, and points
    const leaderboard = data.users
      .map((user) => ({
        username: user.username, // Assuming user has a username field
        points: user.points || 0, // Default to 0 if points are not defined
      }))
      .sort((a, b) => b.points - a.points); // Sort descending by points

    res.send(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
