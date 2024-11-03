import mongoose from "mongoose";

// Account Schema - Core account information
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
      enum: ["SAVINGS", "CHECKING", "CREDIT", "INVESTMENT"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "FROZEN"],
      default: "ACTIVE",
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    }
  },
  {
    timestamps: true,
  }
);

// Transaction Schema - For tracking individual transactions
const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    accountId: {
      type: String,
      required: true,
      ref: "Account",
    },
    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
      default: "PENDING",
    },
    metadata: {
      type: Map,
      of: String,
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
accountSchema.index({ userId: 1, accountId: 1 });
accountSchema.index({ accountId: 1 }, { unique: true });

transactionSchema.index({ accountId: 1, createdAt: -1 });
transactionSchema.index({ transactionId: 1 }, { unique: true });

// Methods for the Account schema
accountSchema.methods.updateBalance = async function(amount) {
  this.balance += amount;
  return this.save();
};

// Middleware to validate balance doesn't go below zero for non-credit accounts
accountSchema.pre('save', function(next) {
  if (this.accountType !== 'CREDIT' && this.balance < 0) {
    next(new Error('Insufficient balance'));
  }
  next();
});

// Export models
export const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
