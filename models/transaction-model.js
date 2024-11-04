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
      ref: packagesModel,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    modeOfPayment: {
      type: String,
      enum: ["cash", "bank", "mBanking"],
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ packageId: 1, transactionDate: -1 });

// Static method to get user transaction summary
transactionSchema.statics.getUserTransactionSummary = async function (
  userId,
  options = {}
) {
  const {
    startDate = new Date(0), // Default to earliest date
    endDate = new Date(), // Default to current date
    groupBy = "month", // 'day', 'month', 'year'
  } = options;

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    // Basic transaction statistics
    const basicStats = await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          transactionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          avgAmount: { $avg: "$amount" },
          maxAmount: { $max: "$amount" },
          minAmount: { $min: "$amount" },
          transactionCount: { $sum: 1 },
          firstTransaction: { $min: "$transactionDate" },
          lastTransaction: { $max: "$transactionDate" },
        },
      },
    ]);

    // Payment mode distribution
    const paymentModeStats = await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          transactionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$modeOfPayment",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Time-based grouping for trend analysis
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
        dateGrouping = {
          year: { $year: "$transactionDate" },
        };
        break;
    }

    const timeTrends = await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          transactionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: dateGrouping,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
          avgAmount: { $avg: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    // Package-wise analysis
    const packageStats = await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          transactionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "packageId",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: "$package",
      },
      {
        $group: {
          _id: "$packageId",
          packageName: { $first: "$package.name" },
          totalAmount: { $sum: "$amount" },
          transactionCount: { $sum: 1 },
          avgAmount: { $avg: "$amount" },
        },
      },
    ]);

    // Construct the final response
    return {
      userId,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      overview: basicStats[0] || {
        totalAmount: 0,
        avgAmount: 0,
        transactionCount: 0,
      },
      paymentModes: paymentModeStats,
      timeTrends,
      packageAnalysis: packageStats,
      recentTransactions: await this.find({ userId })
        .sort({ transactionDate: -1 })
        .limit(5)
        .populate("packageId", "name price"),
    };
  } catch (error) {
    throw new Error(
      `Error generating user transaction summary: ${error.message}`
    );
  }
};

export const transactionModel =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);
