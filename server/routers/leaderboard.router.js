import { Router } from "express";
import { leaderboardController } from "../controllers/leaderboard.controller.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/leaderboard", leaderboardController);

export default leaderboardRouter;
