import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { magicword } from "../controllers/users/magicword.js";

const magicRouter = Router();

magicRouter.get("/magic", authMiddleware, magicword);

export default magicRouter;
