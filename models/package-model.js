import mongoose from "mongoose";

const internetPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      minlength: [2, "Plan name must be at least 2 characters"],
      maxlength: [100, "Plan name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    speed: {
      type: String,
      required: [true, "Internet speed is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: function (v) {
          // Ensures price has maximum 2 decimal places
          return /^\d+(\.\d{1,2})?$/.test(v.toString());
        },
        message: (props) => `${props.value} is not a valid price format!`,
      },
    },
    provider: {
      type: String,
      required: [true, "Provider name is required"],
      trim: true,
      minlength: [2, "Provider name must be at least 2 characters"],
      maxlength: [100, "Provider name cannot exceed 100 characters"],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users", // Reference to the users model
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted price
internetPlanSchema.virtual("formattedPrice").get(function () {
  return `$${this.price.toFixed(2)}`;
});

// Instance method to calculate price with tax
internetPlanSchema.methods.getPriceWithTax = function (taxRate) {
  return Number((this.price * (1 + taxRate)).toFixed(2));
};

// Static method to find plans by provider
internetPlanSchema.statics.findByProvider = function (provider) {
  return this.find({ provider: new RegExp(provider, "i") });
};

// Compound index for efficient querying
internetPlanSchema.index({ provider: 1, speed: 1 });

// Ensure model isn't recreated if it already exists
export const packagesModel =
  mongoose.models.packages || mongoose.model("packages", internetPlanSchema);
