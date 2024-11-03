import mongoose, { Schema } from "mongoose";
import { packagesModel } from "./package-model";
import { userModel } from "./user-model";

const transactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: packagesModel, // Assuming you have a Package model
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: userModel, // Assuming you have a User model
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    modeOfPayment: {
      type: String,
      enum: ["bank", "cash", "mBanking"], // Example types
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
export const transactionModel =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);
