import configuration from "./configuration/configuration.js"
import { connectDb } from "./database/connection.js"
import { logger } from "./configuration/logger/winston.js"
import { app } from "./server.js"

const { app: env_app } = configuration

connectDb().then(() => {
  console.log("Database connected!")

  app.listen(env_app.PORT, () => {
    console.log("Application running on port " + env_app.PORT);
  })
}).catch((e) => logger.error(e));
