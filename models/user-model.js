import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    image: {
      required: false,
      type: String,
    },
    emailVerified: {
      required: false,
      type: Boolean,
    },
    role: {
      required: false,
      type: String,
    },

    phone: {
      required: false,
      type: String,
    },
    shipping_address: {
      required: false,
      type: Object,
    },
    billing_address: {
      required: false,
      type: Object,
    },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
