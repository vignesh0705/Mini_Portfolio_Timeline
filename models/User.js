import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const portfolioItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: [
        "experience",
        "education",
        "project",
        "certification",
        "skill",
        "milestone",
      ],
      default: "experience",
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    portfolioItems: [portfolioItemSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Transform output (remove password from JSON)
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to get user stats
userSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        adminUsers: {
          $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] },
        },
        regularUsers: {
          $sum: { $cond: [{ $eq: ["$role", "user"] }, 1, 0] },
        },
        totalPortfolioItems: {
          $sum: { $size: "$portfolioItems" },
        },
        activeUsers: {
          $sum: { $cond: ["$isActive", 1, 0] },
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalUsers: 0,
      adminUsers: 0,
      regularUsers: 0,
      totalPortfolioItems: 0,
      activeUsers: 0,
    }
  );
};

// Virtual for portfolio items count
userSchema.virtual("portfolioItemsCount").get(function () {
  return this.portfolioItems.length;
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
