import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^.+@.+$/, "Please enter a valid email address"],
  },

  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
