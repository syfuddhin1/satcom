import mongoose, { Schema } from "mongoose";

const accountsTypeSchema = new Schema(
  {
    accountsId: { type: String, required: true, unique: true },
    accountsName: { type: String, required: true },
    accountsType: {
      type: String,
      enum: ["receipts", "payments", "assets", "liabilities", "others"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const accountsTypeModel =
  mongoose.models.AccountsType ||
  mongoose.model("AccountsType", accountsTypeSchema);
