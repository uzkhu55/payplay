import { Router } from "express";
import { signinController } from "../controllers/users/sign-up.controller.js";
import { loginController } from "../controllers/users/login.controller.js";
import { updatePointsController } from "../controllers/users/updatePoints.contoller.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = Router();

userRouter.route("/user/signup").post(signinController);
userRouter.route("/user/login").post(loginController);
userRouter.route("/user/points").post(authMiddleware, updatePointsController); // Add the new route for updating points

export default userRouter;
