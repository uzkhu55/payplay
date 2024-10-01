import cors from "cors";
import env from "dotenv";
import express from "express";
import userRouter from "./routers/user.router.js";
import categoryRouter from "./routers/category.router.js";
import transactionRouter from "./routers/transaction.router.js";
import confirmRouter from "./routers/confirm.router.js";
import mailRouter from "./routers/mail.routers.js";
import questionRouter from "./routers/question.router.js";
import leaderboardRouter from "./routers/leaderboard.router.js";
import changePasswordRouter from "./routers/change-password.router.js";
import ticketRouterbolku from "./routers/ticket.router.js";
import magicRouter from "./routers/magicword.js";
import updateTicketRouter from "./routers/updateTicket.js";
import updateBalanceRouter from "./routers/updateBalance.router.js";
import birthdayRouter from "./routers/birthday.router.js";
import addquestionRouter from "./routers/addquestion.router.js";

env.config({ path: "./.env" });

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", transactionRouter);
app.use("/api", confirmRouter);
app.use("/api", mailRouter);
app.use("/api", questionRouter);
app.use("/api", leaderboardRouter);
app.use("/api", changePasswordRouter);
app.use("/api", ticketRouterbolku);
app.use("/api", magicRouter);
app.use("/api", updateTicketRouter);
app.use("/api", updateBalanceRouter);
app.use("/api", birthdayRouter);
app.use("/api", addquestionRouter);

app.listen(port, () => {
  console.log(`Server is running`);
});
