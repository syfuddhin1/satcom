import mongoose, { Schema } from "mongoose";
import { areaModel } from "./area-model";
import { zoneModel } from "./zone-model";

// Main User Schema with improved validation and organization
const userSchema = new Schema(
  {
    zone: {
      type: String,
      ref: zoneModel,
      required: [true, "Zone information is required"],
    },
    area: {
      type: String,
      ref: areaModel,
      required: [true, "Area information is required"],
    },
    memberCode: {
      type: String,
      required: [true, "Member code is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[A-Z0-9-]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid member code!`,
      },
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    email: {
      type: String,
      // required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    nidNo: {
      type: String,
      required: [true, "NID number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,17}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid NID number!`,
      },
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, "Address cannot be longer than 500 characters"],
    },
    mapLocation: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || v.length >= 6;
        },
        message: "Password must be at least 6 characters long",
      },
    },
    image: {
      type: String,
      trim: true,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "packages", // Reference to the packages model
      },
    ],
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "accounts", // Reference to the accounts model
      },
    ],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "transactions", // Reference to the transactions model
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ "zone.code": 1, "area.code": 1 });
userSchema.index({ status: 1 });
userSchema.index({ role: 1 });


export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
