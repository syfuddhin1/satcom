import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["credit", "debit"], // Example account types
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      ref: "Transaction",
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model defined elsewhere
      required: true,
    },
    amount: {
      type: Number,
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

// Exporting the model
export const accountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
