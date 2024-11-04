import mongoose, { Schema } from "mongoose";

const zoneSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Zone code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Zone name is required"],
      trim: true,
      minlength: [2, "Zone name must be at least 2 characters long"],
      maxlength: [100, "Zone name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, // Index for quick filtering of active/inactive zones
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    searchableText: {
      type: String,
      index: true, // Index for text search
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create compound index for common queries
zoneSchema.index({ code: 1, isActive: 1 });
zoneSchema.index({ name: "text", description: "text" }); // Text search index

// Generate slug and searchable text before saving
zoneSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    // Generate slug from name
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Generate searchable text combining relevant fields
    this.searchableText = [this.code, this.name, this.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }
  next();
});

// Virtual for full zone identifier
zoneSchema.virtual("identifier").get(function () {
  return `${this.code} - ${this.name}`;
});

// Instance method to check if zone can be safely deleted
zoneSchema.methods.canDelete = async function () {
  // Add logic to check for references in other collections
  // Example:
  // const userCount = await mongoose.model('users').countDocuments({ 'zone.code': this.code });
  // return userCount === 0;
  return true;
};

// Static method to find active zones
zoneSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Static method for advanced search
zoneSchema.statics.search = function (query) {
  return this.find({
    $or: [
      { code: new RegExp(query, "i") },
      { name: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
    ],
    isActive: true,
  }).select("code name description");
};

// Middleware to handle reference checks before deletion
zoneSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const canDelete = await this.canDelete();
    if (!canDelete) {
      throw new Error(
        "Zone cannot be deleted as it is referenced by other documents"
      );
    }
  }
);

// Custom error messages for duplicate key errors
zoneSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`A zone with this ${field} already exists`));
  } else {
    next(error);
  }
});

// Create the model
export const zoneModel =
  mongoose.models.zones || mongoose.model("zones", zoneSchema);
