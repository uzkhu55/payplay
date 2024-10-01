import fs from "fs/promises"; // Import from fs/promises

export const Question = async (req, res) => {
  try {
    // Read and parse the JSON file
    const resultJSON = await fs.readFile("./db.json", "utf-8");
    const result = JSON.parse(resultJSON);

    // Check if the questions array exists and has elements
    const questions = result.questions || [];

    if (questions.length === 0) {
      return res.status(404).send({ message: "No questions found." });
    }

    res.send({ questions });
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
