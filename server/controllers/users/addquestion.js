import fs from "fs/promises";

export const AddQuestion = async (req, res) => {
  const { question, answer } = req.body; // Extract question and answer from the request body

  try {
    const dbPath = "./db.json";
    const dbData = JSON.parse(await fs.readFile(dbPath, "utf-8"));

    // Generate a new ID for the question
    const newId = generateUniqueId(); // You'll need to implement this function

    // Create the new question object
    const newQuestion = {
      id: newId,
      question,
      answer,
    };

    // Add the new question to the questions array
    dbData.questions.push(newQuestion);

    // Write the updated data back to the JSON file
    await fs.writeFile(dbPath, JSON.stringify(dbData, null, 2)); // Use pretty print with 2 spaces

    res.status(201).json(newQuestion); // Return the newly added question
  } catch (error) {
    console.error("Error updating the JSON file:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Function to generate a unique ID (example implementation)
const generateUniqueId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
