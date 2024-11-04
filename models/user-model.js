import mongoose, { Schema } from "mongoose";
import { packagesModel } from "./package-model";
import { zoneModel } from "./zone-model";
import { areaModel } from "./area-model";

// Package Schema with improved validation
const packageSchema = new Schema(
  {
    billing_date: {
      type: String,
      required: [true, "Billing date is required"],
      trim: true,
    },
    packageType: {
      type: Schema.Types.ObjectId,
      required: [true, "Package type is required"],
      ref: "packages", // Using string reference instead of model reference for better reliability
      validate: {
        validator: async function (value) {
          const packages = await packagesModel.findById(value);
          return packages !== null;
        },
        message: "Referenced package does not exist",
      },
    },
    packageName: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      minlength: [2, "Package name must be at least 2 characters long"],
    },
    sCharge: {
      type: Number,
      required: [true, "Service charge is required"],
      min: [0, "Service charge cannot be negative"],
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
      trim: true,
      minlength: [2, "Provider name must be at least 2 characters long"],
    },
    package_bill: {
      type: Number,
      required: [true, "Package bill is required"],
      min: [0, "Package bill cannot be negative"],
    },
  },
  {
    _id: true, // Explicitly enable _id for subdocuments
    timestamps: true, // Add timestamps to package changes
  }
);

// Accounts Schema with improved validation
const AccountsSchema = new Schema(
  {
    voucherId: {
      type: String,
      ref: "accounts", // Using string reference instead of model reference for better reliability
      required: [true, "Voucher ID is required"],
      unique: true,
      partialFilterExpression: { voucherId: { $exists: true, $ne: null } },
      trim: true,
    },
    transactionId: {
      type: String,
      ref: "transactions", // Using string reference instead of model reference for better reliability
      required: [true, "Transaction ID is required"],
      unique: true,
      trim: true,
    },
    transactionDate: {
      type: Date,
      required: [true, "Transaction date is required"],
      index: true, // Add index for better query performance
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

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
      required: [true, "Email is required"],
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
    packages: {
      type: [packageSchema],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: "Packages must be an array",
      },
    },
    accounts: {
      type: [AccountsSchema],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: "Accounts must be an array",
      },
    },
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

// Virtual for full name
// userSchema.virtual("fullName").get(function () {
//   return this.name;
// });

// Pre-save middleware for password hashing (placeholder)
// userSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     // Add password hashing logic here
//   }
//   next();
// });

// Model creation with collection name enforcement
export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
