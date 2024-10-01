import fs from "fs";

export const updateTicket = async (req, res) => {
  const { userId } = res.locals;

  // Read the existing data from db.json
  const resultJSON = fs.readFileSync("./db.json", "utf-8");
  const data = JSON.parse(resultJSON);

  // Find the user by userId
  const user = data.users.find((el) => el.userId === userId);

  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  // Decrement the ticket count by 1, but ensure it doesn't go below 0
  const updatedTicket = Math.max(user.ticket - 1, 0);

  // Update the user's ticket count in the data
  const updatedUsers = data.users.map((u) => {
    if (u.userId === userId) {
      return { ...u, ticket: updatedTicket };
    }
    return u;
  });

  // Save the updated data back to db.json
  data.users = updatedUsers;
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2), "utf-8");

  // Send success response with the updated ticket count
  res.json({ ticket: updatedTicket });
};
