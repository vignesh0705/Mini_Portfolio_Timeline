import jwt from "jsonwebtoken";
import connectDB from "../lib/mongodb.js";
import User from "../models/User.js";
import seedDatabase from "../lib/seedDatabase.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const createUser = async (userData) => {
  await connectDB();

  const { email, password, name, role = "user" } = userData;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = new User({
    email,
    password,
    name,
    role,
  });

  await newUser.save();

  return {
    id: newUser._id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };
};

export const authenticateUser = async (email, password) => {
  await connectDB();

  const user = await User.findByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  user.lastLogin = new Date();
  await user.save();

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export const getUserById = async (userId) => {
  await connectDB();

  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return null;
  }
};

export const updateUserPortfolio = async (userId, portfolioItems) => {
  await connectDB();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    user.portfolioItems = portfolioItems;
    await user.save();
    return true;
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return false;
  }
};

export const getUserPortfolio = async (userId) => {
  await connectDB();

  try {
    const user = await User.findById(userId);
    return user ? user.portfolioItems : [];
  } catch (error) {
    return [];
  }
};

export const getAllUsers = async (requestingUserId) => {
  await connectDB();

  const requestingUser = await getUserById(requestingUserId);
  if (!requestingUser || requestingUser.role !== "admin") {
    throw new Error("Access denied. Admin privileges required.");
  }

  const users = await User.find({ isActive: true })
    .select("-password")
    .sort({ createdAt: -1 });

  return users.map((user) => ({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    portfolioItemsCount: user.portfolioItems.length,
    lastLogin: user.lastLogin,
  }));
};

export const deleteUser = async (requestingUserId, targetUserId) => {
  await connectDB();

  const requestingUser = await getUserById(requestingUserId);
  if (!requestingUser || requestingUser.role !== "admin") {
    throw new Error("Access denied. Admin privileges required.");
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    throw new Error("User not found");
  }

  if (targetUserId === requestingUserId) {
    throw new Error("Cannot delete your own account");
  }

  if (targetUser.role === "admin") {
    throw new Error("Cannot delete admin accounts");
  }

  targetUser.isActive = false;
  await targetUser.save();

  return true;
};

export const getSystemStats = async (requestingUserId) => {
  await connectDB();

  const requestingUser = await getUserById(requestingUserId);
  if (!requestingUser || requestingUser.role !== "admin") {
    throw new Error("Access denied. Admin privileges required.");
  }

  const stats = await User.getStats();
  return stats;
};

export const initializeDatabase = async () => {
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};
