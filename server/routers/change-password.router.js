import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { updatePassword } from "../controllers/users/updatePassword.js";

const changePasswordRouter = Router();
changePasswordRouter.post("/change-password", authMiddleware, updatePassword);

export default changePasswordRouter;
