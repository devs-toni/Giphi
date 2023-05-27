import { Schema, model } from "mongoose";

const gifSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    gif: { type: String, required: true },
    userId: { type: String }
  },
  {
    timestamps: true,
  }
);

export const gifModel = model("Gif", gifSchema);
