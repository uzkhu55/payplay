import { sql } from "../../database/index.js";

export const AddQuestion = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const [newQuestion] = await sql`
      INSERT INTO questions (question, answer)
      VALUES (${question}, ${answer})
      RETURNING *`;

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error inserting the question into the database:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
