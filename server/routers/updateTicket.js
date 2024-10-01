import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { updateTicket } from "../controllers/users/updateTicket.js";

const updateTicketRouter = Router();
updateTicketRouter.post("/updateTicket", authMiddleware, updateTicket);

export default updateTicketRouter;
