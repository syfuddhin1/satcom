import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    zone: {
      type: Object,
      required: true,
      trim: true,
    },
    area: {
      type: Object,
      required: true,
      trim: true,
    },
    memberCode: {
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
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nidNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    mapLocation: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Member"],
      default: "User",
    },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
