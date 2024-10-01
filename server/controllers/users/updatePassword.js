import fs from "fs";
import bcrypt from "bcryptjs";

export const updatePassword = async (req, res) => {
  const { password, updatePassword } = req.body;
  const { userId } = res.locals;

  const resultJSON = fs.readFileSync("./db.json", "utf-8");
  const data = JSON.parse(resultJSON);

  const user = data.users.find((el) => {
    return el.userId === userId;
  });

  const matchPassword = await bcrypt.compare(password, user.password);

  const hashedPassword = bcrypt.hashSync(updatePassword, 10);

  if (!matchPassword || !user) {
    res.status(400).send("alda");
    return;
  }
  const newResult = data.users.map((user) => {
    if (user.userId === userId) {
      return { ...user, password: hashedPassword };
    } else {
      return user;
    }
  });

  data.users = [...newResult];

  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2), "utf-8");
  res.send("success");
};
