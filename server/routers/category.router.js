import { Router } from "express";
import { Category } from "../controllers/category/category.js";

const categoryRouter = Router();

categoryRouter.route("/user/category").post(Category);

export default categoryRouter;
