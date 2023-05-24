import dotenv from "dotenv"
dotenv.config()

const { NODE_ENV, PORT, DB_URI, DB_URI_PROD } = process.env;

export const ENV = NODE_ENV || "development";

const Configuration = {
  development: {
    app: {
      PORT: PORT || 4000,
      FRONT_URI: "http://localhost:3000",
    },
    db: {
      DB_URI: DB_URI,
    }
  },
  production: {
    app: {
      PORT: PORT || 4000,
      FRONT_URI: "https://giphi.arcprojects.es",
    },
    db: {
      DB_URI: DB_URI_PROD,
    }
  }
}

export default Configuration[ENV]
