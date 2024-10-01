import fs from "fs/promises";

export const updatePointsController = async (req, res) => {
  try {
    const { points } = req.body;
    const { userId } = res.locals;

    const resultJSON = await fs.readFile("./db.json", "utf-8");
    const data = JSON.parse(resultJSON);

    const user = data.users.map((user) => {
      if (user.userId === userId) {
        return { ...user, points };
      } else {
        return user;
      }
    });

    data.users = user;

    await fs.writeFile("./db.json", JSON.stringify(data, null, 2));
    res.send({ message: "Points updated successfully", points: user.points });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
