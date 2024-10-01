import { Router } from "express";

import { Question } from "../controllers/question/question.js";
import { authMiddleware } from "../middleware/auth.js";

const questionRouter = Router();

questionRouter.get("/question", authMiddleware, Question);

export default questionRouter;
