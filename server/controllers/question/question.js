import { sql } from "../../database/index.js";

export const Question = async (req, res) => {
  try {
    const questions = await sql`SELECT * FROM questions`;

    if (questions.length === 0) {
      return res.status(404).send({ message: "No questions found." });
    }

    res.send({ questions });
  } catch (error) {
    console.error("Error retrieving questions from the database:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
