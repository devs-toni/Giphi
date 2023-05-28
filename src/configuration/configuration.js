import dotenv from "dotenv"
dotenv.config()

const { NODE_ENV, PORT, DB_URI, DB_URI_PROD, CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } = process.env;

export const ENV = NODE_ENV || "development";

const Configuration = {
  development: {
    app: {
      PORT: PORT || 4000,
      FRONT_URI: "http://localhost:3000",
    },
    db: {
      DB_URI: DB_URI,
    },
    cloudinary: {
      NAME: CLOUDINARY_NAME,
      KEY: CLOUDINARY_KEY,
      SECRET: CLOUDINARY_SECRET
    }
  },
  production: {
    app: {
      PORT: PORT || 4002,
      FRONT_URI: "https://giphi.arcprojects.es",
    },
    db: {
      DB_URI: DB_URI_PROD,
    },
    cloudinary: {
      NAME: CLOUDINARY_NAME,
      KEY: CLOUDINARY_KEY,
      SECRET: CLOUDINARY_SECRET
    }
  }
}

export default Configuration[ENV]
