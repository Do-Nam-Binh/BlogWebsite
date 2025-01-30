import { generateToken } from "../../utils/generateToken.js";
import { hashPassword, validatePassword } from "../../utils/hashPassword.js";
import Account from "../entity/account.model.js";
import { generateHexId } from "../../utils/setId.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailExist = await Account.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already taken!" });
    }

    const userExist = await Account.findOne({ username });
    if (userExist) {
      return res.status(400).json({ error: "Username already taken!" });
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

    res.status(201).json({
      id: newAccount.id,
      email: newAccount.email,
      username: newAccount.username,
      type: newAccount.type,
      profileImg: newAccount.profileImg,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // Identifier can be email or username

    if (!identifier || !password) {
      return res.status(400).json({ message: "Both fields are required." });
    }

    const user = await Account.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const correctPassword = await validatePassword(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Invalid username or password!" });
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth/refresh-token",
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged Out!" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden" });
        }

        const accessToken = generateToken(
          decoded,
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRATION
        );

        return res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Error in refresh token controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
