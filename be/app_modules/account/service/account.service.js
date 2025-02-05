import { hashPassword, validatePassword } from "../../utils/hashPassword.js";
import Account from "../entity/account.model.js";
import { generateHexId } from "../../utils/setId.js";
import { generateToken } from "../../utils/generateToken.js";
import dotenv from "dotenv";
import Joi from "joi";

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

  const userExist = await Account.findOne({ username });
  if (userExist) {
    throw new Error("Username already taken");
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

  return { accessToken, refreshToken };
};

export const googleLoginService = async (body) => {
  const { googleId, email, username, profileImg } = body;

  let user = await Account.findOne({ googleId });

  if (!user) {
    user = new Account({
      _id: googleId,
      googleId,
      email,
      username,
      profileImg: profileImg || null,
    });

    await user.save();
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

  return { accessToken, refreshToken };
};

export const refreshAccessTokenService = async (res, req) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const accessToken = generateToken(
      decoded,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );

    return res.status(200).json({ accessToken });
  });
};
