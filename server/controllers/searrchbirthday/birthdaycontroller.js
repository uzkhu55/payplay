import fs from "fs/promises"; // Use fs/promises for async file operations

export const Birthday = async (req, res) => {
  const { birthday } = req.query; // Extract birthday from the query

  try {
    // Read and parse the JSON file
    const dbPath = "./db.json";
    const dbData = JSON.parse(await fs.readFile(dbPath, "utf-8"));

    // Filter users by the provided birthday
    const users = dbData.users.filter((user) => user.birthday === birthday);

    // If users are found, return their usernames
    if (users.length > 0) {
      const usernames = users.map((user) => user.username);
      res.json(usernames);
    } else {
      res.json([]); // Return an empty array if no users match the birthday
    }
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
