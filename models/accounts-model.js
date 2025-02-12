import mongoose from "mongoose";
const accountInfoSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    transactionDate: {
      type: Date,
      required: true,
      index: true,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      unique: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const accountSchema = new mongoose.Schema(
  {
    voucherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    accountInfo: {
      type: [accountInfoSchema],
      default: [],
      required: true,
    },
    accountType: {
      type: String,
      enum: ["credit", "debit", "journal"],
      required: true,
      lowercase: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid amount. Amount must be non-negative.`,
      },
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for potential queries that combine accountId and userId
accountSchema.index({ accountId: 1, userId: 1 });
accountSchema.index({ createdAt: -1 });

// Virtual for calculating the total balance for an account
accountSchema.virtual("balance").get(function () {
  return this.accountType === "credit" ? this.amount : -this.amount;
});

// Static method to get user statistics
accountSchema.statics.getUserStatistics = async function (userId) {
  const stats = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAccounts: { $sum: 1 },
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$accountType", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$accountType", "debit"] }, "$amount", 0] },
        },
        netBalance: {
          $sum: {
            $cond: [
              { $eq: ["$accountType", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] },
            ],
          },
        },
      },
    },
  ]);
  return (
    stats[0] || {
      totalAccounts: 0,
      totalCredit: 0,
      totalDebit: 0,
      netBalance: 0,
    }
  );
};

// Static method to get overall account statistics
accountSchema.statics.getAccountStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalAccounts: { $sum: 1 },
        totalUsers: { $addToSet: "$userId" },
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$accountType", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$accountType", "debit"] }, "$amount", 0] },
        },
        netBalance: {
          $sum: {
            $cond: [
              { $eq: ["$accountType", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] },
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalAccounts: 1,
        totalUsers: { $size: "$totalUsers" },
        totalCredit: 1,
        totalDebit: 1,
        netBalance: 1,
      },
    },
  ]);
  return (
    stats[0] || {
      totalAccounts: 0,
      totalUsers: 0,
      totalCredit: 0,
      totalDebit: 0,
      netBalance: 0,
    }
  );
};

accountSchema.statics.getStatisticsByDateRange = async function (
  userId,
  startDate,
  endDate
) {
  return await this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: null,
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$accountType", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$accountType", "debit"] }, "$amount", 0] },
        },
        netBalance: {
          $sum: {
            $cond: [
              { $eq: ["$accountType", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] },
            ],
          },
        },
      },
    },
  ]);
};
accountSchema.statics.getBalanceOverTime = async function (userId) {
  return await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        amount: "$amount",
        accountType: "$accountType",
      },
    },
    {
      $group: {
        _id: { month: "$month", year: "$year" },
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$accountType", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$accountType", "debit"] }, "$amount", 0] },
        },
        netBalance: {
          $sum: {
            $cond: [
              { $eq: ["$accountType", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] },
            ],
          },
        },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};
// Monthly summary
accountSchema.statics.getMonthlySummary = async function (userId, month, year) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  return await this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: null,
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$accountType", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$accountType", "debit"] }, "$amount", 0] },
        },
        netBalance: {
          $sum: {
            $cond: [
              { $eq: ["$accountType", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] },
            ],
          },
        },
      },
    },
  ]);
};
accountSchema.statics.getAccountSummary = async function (
  accountId,
  options = {}
) {
  const {
    startDate = new Date(0),
    endDate = new Date(),
    groupBy = "month",
  } = options;

  try {
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      throw new Error("Invalid account ID");
    }

    const basicStats = await this.aggregate([
      {
        $match: {
          accountId: new mongoose.Types.ObjectId(accountId),
          transactionDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$amount" },
          avgTransactionAmount: { $avg: "$amount" },
          maxTransactionAmount: { $max: "$amount" },
          minTransactionAmount: { $min: "$amount" },
          transactionCount: { $sum: 1 },
          firstTransaction: { $min: "$transactionDate" },
          lastTransaction: { $max: "$transactionDate" },
        },
      },
    ]);

    let dateGrouping;
    switch (groupBy) {
      case "day":
        dateGrouping = {
          year: { $year: "$transactionDate" },
          month: { $month: "$transactionDate" },
          day: { $dayOfMonth: "$transactionDate" },
        };
        break;
      case "month":
        dateGrouping = {
          year: { $year: "$transactionDate" },
          month: { $month: "$transactionDate" },
        };
        break;
      case "year":
        dateGrouping = { year: { $year: "$transactionDate" } };
        break;
    }

    const timeTrends = await this.aggregate([
      {
        $match: {
          accountId: new mongoose.Types.ObjectId(accountId),
          transactionDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: dateGrouping,
          totalAmount: { $sum: "$amount" },
          transactionCount: { $sum: 1 },
          avgAmount: { $avg: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    return {
      accountId,
      dateRange: { start: startDate, end: endDate },
      overview: basicStats[0] || {
        totalBalance: 0,
        avgTransactionAmount: 0,
        transactionCount: 0,
      },
      timeTrends,
      recentTransactions: await this.find({ accountId })
        .sort({ transactionDate: -1 })
        .limit(5),
    };
  } catch (error) {
    throw new Error(`Error generating account summary: ${error.message}`);
  }
};

// Exporting the model
export const accountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
