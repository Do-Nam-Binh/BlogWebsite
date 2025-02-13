import { hashPassword, validatePassword } from "../../utils/hashPassword.js";
import Account from "../entity/account.model.js";
import { generateHexId } from "../../utils/setId.js";
import { generateToken } from "../../utils/generateToken.js";
import dotenv from "dotenv";
import Joi from "joi";
import Token from "../entity/token.model.js";
import jwt from "jsonwebtoken";

dotenv.config();

const accountValidate = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const signupService = async (body) => {
  const { error } = accountValidate.validate(body);
  if (error) {
    throw error;
  }

  const { email, username, password } = body;

  const emailExist = await Account.findOne({ email });
  if (emailExist) {
    throw new Error("Email already taken");
  }

  const hashedPassword = await hashPassword(password);

  const newAccount = new Account({
    _id: generateHexId("account"),
    email: email,
    username: username,
    password: hashedPassword,
    type: "USER",
    profileImg: null,
  });
  await newAccount.save();

  return newAccount;
};

export const loginService = async (body) => {
  const { email, password } = body; // Identifier can be email or username

  if (!email || !password) {
    throw new Error("Both fields are required.");
  }

  const user = await Account.findOne({ email: email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const correctPassword = await validatePassword(password, user.password);
  if (!correctPassword) {
    throw new Error("Invalid username or password!");
  }

  const accessToken = generateToken(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRATION
  );

  const refreshToken = generateToken(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRATION
  );

  const token = await Token.findOne({ email: user.email });

  if (token) {
    token.refreshToken = refreshToken;
    await token.save();
  } else {
    const newToken = new Token({
      _id: generateHexId("token"),
      userId: user._id,
      email: user.email,
      refreshToken: refreshToken,
    });

    await newToken.save();
  }

  return {
    accessToken,
    refreshToken,
    user: {
      userId: user._id,
      username: user.username,
      profileImg: user.profileImg,
    },
  };
};

export const logoutService = async (req) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return "Not logged in";
  }

  const token = Token.findOne({ refreshToken: refreshToken });
  if (!token) {
    throw new Error("Token not found");
  }

  await token.deleteOne();
  return "Logged out";
};

export const refreshAccessTokenService = async (req) => {
  const { refreshToken } = req.cookies;

  console.log("Incoming Cookies:", req.cookies);

  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const token = await Token.findOne({ refreshToken: refreshToken });
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) reject(new Error("Forbidden"));
          resolve(decoded);
        }
      );
    });

    const accessToken = generateToken(
      decoded,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );

    console.log("New Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    throw new Error("Forbidden"); // Return 403 instead of crashing
  }
};
