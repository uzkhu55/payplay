import fs from "fs";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sql } from "../../database/index.js";

export const signinController = async (req, res) => {
  const {
    email,
    username,
    password,
    birthday,
    balance = 0,
    ticket = 5,
  } = req.body;

  const existingUser = await sql`SELECT * FROM oorusers WHERE email=${email}`;

  if (existingUser.length) {
    res.status(400).send("User exists");
    return;
  }

  const userId = uuid();

  const hashedPassword = bcrypt.hashSync(password, 10);

  await sql`INSERT INTO oorusers(userid, username, email, password, balance, createdat, birthday, ticket) VALUES(${userId}, ${username}, ${email}, ${hashedPassword}, ${balance}, ${new Date().toISOString()}, ${birthday}, ${ticket})`;

  res.status(200).send("Амжилттай бүртгүүллээ");
};
