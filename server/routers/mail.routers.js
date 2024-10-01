import { Router } from "express";
import { Mail } from "../controllers/mail/mail.js";

const mailRouter = Router();
mailRouter.route("/user/mail").post(Mail);

export default mailRouter;
