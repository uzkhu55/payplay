import { Router } from "express";
import { Confirm } from "../controllers/confirm/confirm.js";

const confirmRouter = Router();
confirmRouter.route("/user/confirm").post(Confirm);

export default confirmRouter;
