import mongoose from "mongoose";
import { generateHexId } from "../../utils/setId";

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
      minlength: 6,
      validate: {
        validator: (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(
            value
          ),
        message:
          "Password must be at least 6 characters long and include one uppercase letter, one number, and one special character.",
      },
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
