import fs from "fs";
import path from "path";

// Path to your db.json file
const filePath = path.join(process.cwd(), "db.json");

export default async function updateBalance(req, res) {
  if (req.method === "POST") {
    const { username, amount } = req.body;

    try {
      // Read the db.json file
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Find the user by username
      const user = data.users.find((user) => user.username === username);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's balance
      user.balance += parseFloat(amount);

      // Write the updated data back to db.json
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return res
        .status(200)
        .json({ message: "Balance updated successfully", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating balance" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
