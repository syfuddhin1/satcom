import mongoose, { Schema } from "mongoose";

const packageSchema = new Schema({
  billing_date: {
    type: String,
    required: true,
    trim: true,
  },
  packageType: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  sCharge: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    trim: true,
  },
  package_bill: {
    type: Number,
    required: true,
  },
});

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
    image: {
      type: String,
      trim: true,
    },
    packages: {
      type: [packageSchema], // Array of package objects
      default: [], // Default as an empty array
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
  mongoose.models.users || mongoose.model("users", userSchema);
