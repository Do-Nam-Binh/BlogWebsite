import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    profileImg: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
