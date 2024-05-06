// import mongoose, { Schema, models } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const User = models.User || mongoose.model("User", userSchema);
// export default User;
import mongoose, { Schema, models } from "mongoose";

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
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
