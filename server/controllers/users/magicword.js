import { sql } from "../../database/index.js";

export const magicword = async (req, res) => {
  const { userId } = res.locals;

  try {
    // Find the user by userId in the database
    const user = await sql`SELECT * FROM oorusers WHERE id = ${userId}`;

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving user" });
  }
};
