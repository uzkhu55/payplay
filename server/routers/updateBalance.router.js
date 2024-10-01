import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import updateBalance from "../controllers/users/updateBalance.js";

const updateBalanceRouter = Router();
updateBalanceRouter.post("/updateBalance", authMiddleware, updateBalance);

export default updateBalanceRouter;
