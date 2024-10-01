import express from "express";
import { AddQuestion } from "./controllers"; // Import your controller functions

const router = express.Router();

router.post("/api/add-question", AddQuestion); // New endpoint for adding questions

export default router;
