import mongoose from "mongoose"
import configuration from "../configuration/configuration.js"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const { db } = configuration

export const connectDb = () => {
  return mongoose.connect(db.DB_URI);
} 
