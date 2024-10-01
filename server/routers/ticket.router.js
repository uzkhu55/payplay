import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { Ticketnotworking } from "../controllers/ticket/ticket.controller.js";

const ticketRouterbolku = Router();

ticketRouterbolku.get("/ticket", authMiddleware, Ticketnotworking);

export default ticketRouterbolku;
