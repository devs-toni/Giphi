import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import parser from "body-parser"
import fileUpload from "express-fileupload"
import { loggerStream } from "./configuration/logger/winston.js"
import Configuration, { ENV } from "./configuration/configuration.js"
import { headers } from "./middleware/headers.js"
import { userRouter } from "./router/userRouter.js"
import { gifRouter } from "./router/gifRouter.js"
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger-output.json' assert { type: "json" };

export const app = express()
const { app: env_app } = Configuration;
const { json } = parser

app.use(express.json())
app.use(helmet())
app.use(headers)
app.use(cors({ origin: [env_app.FRONT_URI], methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }))
app.use(morgan(":method :url :status: :res[content-length]- :response-time ms - API Server", { stream: loggerStream, skip: () => !ENV }))
app.use(fileUpload({ useTempFiles: true, tempFileDir: "uploads", limits: { fileSize: 3000000000 }, abortOnLimit: true }))
app.use(json({ limit: "50mb" }))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use("/users", userRouter)
app.use("/gifs", gifRouter)