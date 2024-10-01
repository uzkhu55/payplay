import fs from "fs/promises";

export const Ticketnotworking = async (req, res) => {
  const { userId } = res.locals;
  const resultJSON = await fs.readFile("./db.json", "utf-8");
  const result = JSON.parse(resultJSON);

  const user = result.users.find((user) => user.userId === userId);

  res.send(user);
};
