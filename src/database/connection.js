import mongoose from "mongoose"
import configuration from "../configuration/configuration.js"
import dotenv from "dotenv"

dotenv.config()

const { db } = configuration

export const connectDb = () => {
  return mongoose.connect(db.DB_URI);
}

/* export const connectDb = () => {
  return mongoose.connect(`${process.env.DB_URI_PROD_KEY}${__dirname}/mongo_key.pem`);
};  */
