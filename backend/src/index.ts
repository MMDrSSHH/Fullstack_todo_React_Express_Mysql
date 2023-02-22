import express from "express";
import dotenv from "dotenv";
dotenv.config();
import usersRouter from "./routes/users/users";
import todosRouter from "./routes/todos/todos";
import authRouter from "./routes/auth/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("The server is running on port " + process.env.PORT);
});

app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/auth", authRouter);
