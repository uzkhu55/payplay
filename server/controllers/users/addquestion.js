import { sql } from "../../database/index.js"; // Import the SQL database connection

export const AddQuestion = async (req, res) => {
  const { question, answer } = req.body; // Extract question and answer from the request body

  try {
    // Insert the new question into the questions table
    const [newQuestion] = await sql`
      INSERT INTO questions (question, answer)
      VALUES (${question}, ${answer})
      RETURNING *`;

    // Return the newly added question
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error inserting the question into the database:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
