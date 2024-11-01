import mongoose, { Schema } from "mongoose";

const areaSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    zoneCode: {
      type: String,
      required: true,
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

export const areaModel =
  mongoose.models.areas ?? mongoose.model("areas", areaSchema);
