import { sql } from "../../database/index.js";

export default async function updateBalance(req, res) {
  if (req.method === "POST") {
    const { username, amount } = req.body;

    try {
      const user =
        await sql`SELECT * FROM oorusers WHERE username = ${username}`;

      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's balance
      const newBalance = parseFloat(user[0].balance) + parseFloat(amount);
      await sql`UPDATE oorusers SET balance = ${newBalance} WHERE username = ${username}`;

      return res.status(200).json({
        message: "Balance updated successfully",
        user: { ...user[0], balance: newBalance },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating balance" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
