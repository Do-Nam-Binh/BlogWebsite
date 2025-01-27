import mongoose from "mongoose";
import { generateHexId } from "../../utils/setId.js";

const accountSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: generateHexId("account"),
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
