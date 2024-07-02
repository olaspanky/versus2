import mongoose, { Schema, models } from "mongoose";

const previousPasswordSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const locationSchema = new Schema({
  country: String,
  state: String,
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    subscription: {
      type: [String],
      default: null,
    },
    fingerprint: {
      type: String,
      default: null,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActivityTimestamp: { type: Date },
    loginTimestamp: {
      type: Date,
    },
    logoutTimestamp: {
      type: Date,
    },
    sessionDuration: {
      type: Number,
      default: 0, // in milliseconds
    },
    weekStartTimestamp: {
      type: Date, // timestamp to track week start
    },
    previousPasswords: {
      type: [previousPasswordSchema],
      default: [],
    },
    loginLocation: {
      type: locationSchema,
      default: null,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
