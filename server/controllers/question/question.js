import { sql } from "../../database/index.js"; // Import the SQL database connection

export const Question = async (req, res) => {
  try {
    // Fetch questions from the database
    const questions = await sql`SELECT * FROM questions`;

    // Check if there are any questions
    if (questions.length === 0) {
      return res.status(404).send({ message: "No questions found." });
    }

    res.send({ questions });
  } catch (error) {
    console.error("Error retrieving questions from the database:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
