import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";
import { AddQuestion } from "../controllers/users/addquestion.js";

const addquestionRouter = Router();

addquestionRouter.post("/addquestion", authMiddleware, AddQuestion);

export default addquestionRouter;
