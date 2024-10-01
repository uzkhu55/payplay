import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";
import { Birthday } from "../controllers/searrchbirthday/birthdaycontroller.js";

const birthdayRouter = Router();

birthdayRouter.get("/birthday", authMiddleware, Birthday);

export default birthdayRouter;
