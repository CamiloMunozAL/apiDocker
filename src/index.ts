import express from "express";
import {PORT} from "./config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import sectionRouter from "./routes/sectionRouter";
import taskRouter from "./routes/taskRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";
import path from "path";
import { Request, Response } from "express";

console.clear();

const corsOptions ={
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api",authRouter);
app.use("/api",sectionRouter);
app.use("/api",taskRouter);
app.use("/api",userRouter);

// Middleware para manejar rutas no encontradas
app.use((_: Request, res: Response) => {
    res.status(404).send("Path not found");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
