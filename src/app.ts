import express from "express";
import type { Application, Request, Response } from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser";
import cors from 'cors'
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger)

app.use(CookieParser())

const corsOptions= {
    origin: "http://localhost:5173",
}

app.use(cors(corsOptions));


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Learning Express with PostgreSQL-NeonDB",
    });
});

app.use("/api/v1/users",userRoute)
app.use("/api/v1/profiles",profileRoute)
app.use("/api/v1/auth", authRoute)

app.use(globalErrorHandler);

export default app;