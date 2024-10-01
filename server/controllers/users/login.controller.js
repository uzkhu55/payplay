import bcrypt from "bcryptjs";

import { sql } from "../../database/index.js";
import jwt from "jsonwebtoken";

const SecretKey = "uzkhu";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const [checkUser] = await sql`SELECT * FROM oorusers WHERE email=${email}`;

  if (!checkUser) {
    res.status(400).json({ message: "Бүртгэлгүй байна" });
    return;
  }

  const match = await bcrypt.compare(password, checkUser.password);
  if (!match) {
    res.status(400).json({ message: "Нууц үг таарахгүй байна" });
    return;
  }
  const token = jwt.sign(
    { userId: checkUser.userId, email: checkUser.email },
    SecretKey,
    { expiresIn: "365d" }
  );

  res.status(200).json({
    message: "Амжилттай нэвтэрлээ",
    token,
    username: checkUser.username,
  });
};
