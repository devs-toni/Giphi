import express from "express"
import helmet from "helmet"
import path from "path"
import cors from "cors"
import morgan from "morgan"
import parser from "body-parser"
import { loggerStream } from "./configuration/logger/winston.js"
import Configuration, { ENV } from "./configuration/configuration.js"
import { headers } from "./middleware/headers.js"
import { userRouter } from "./router/userRouter.js"


export const app = express();
const { app: env_app } = Configuration;
const { json } = parser

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(json({ limit: "50mb" }));
app.use(helmet());
app.use(headers);
app.use(cors({ origin: [env_app.FRONT_URI], methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }))
app.use(morgan(":method :url :status: :res[content-length]- :response-time ms - API Server", { stream: loggerStream, skip: () => !ENV }))

app.use("/users", userRouter)