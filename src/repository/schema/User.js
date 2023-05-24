import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("User", userSchema);
