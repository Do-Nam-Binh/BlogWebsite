import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    googleId: {
      type: String, // Store Google ID if the user logs in with Google
      unique: true,
      sparse: true, // Allows unique constraint but permits null values
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^.+@.+$/, "Please enter a valid email address"],
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if Google ID is absent
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
