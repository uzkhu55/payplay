import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "alga" });
  }

  const jwtToken = token.split(" ")[1];

  if (!jwtToken) {
    return res.status(401).send({ message: "Token is missing" });
  }

  jwt.verify(jwtToken, process.env.SECRET, (err, success) => {
    if (err) {
      return res.status(401).send({ message: err.message });
    } else {
      res.locals.userId = success.userId;

      next();
    }
  });
};
