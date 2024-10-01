import { Router } from "express";
import { Transaction } from "../controllers/transaction/transaction.js";

const transactionRouter = Router();

transactionRouter.route("/user/transaction").post(Transaction);

export default transactionRouter;
