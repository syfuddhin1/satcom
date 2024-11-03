import mongoose, { Schema } from "mongoose";

const internetPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    speed: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const packagesModel =
  mongoose.models.packages ?? mongoose.model("packages", internetPlanSchema);
