import mongoose from "mongoose";

const previousPasswordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const locationSchema = new mongoose.Schema({
  country: String,
  state: String,
});

const sessionDurationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema(
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
    previousPasswords: {
      type: [previousPasswordSchema],
      default: [],
    },
    loginLocation: {
      type: locationSchema,
      default: null,
    },
    sessionDuration: {
      type: [sessionDurationSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
