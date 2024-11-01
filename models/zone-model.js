import mongoose, { Schema } from "mongoose";

const zoneSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export const zoneModel =
  mongoose.models.zones ?? mongoose.model("zones", zoneSchema);
