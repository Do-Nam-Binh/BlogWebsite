import { generateToken } from "../../utils/generateToken.js";
import { hashPassword, validatePassword } from "../../utils/hashPassword.js";
import Account from "../entity/account.model.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username | !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exist = await Account.findOne({ username });
    if (exist) {
      return res.status(400).json({ error: "Username already taken!" });
    }

    const hashedPassword = await hashPassword(password);

    const newAccount = new Account({
      username: username,
      password: hashedPassword,
      type: "USER",
    });
    await newAccount.save();

    res.status(201).json({
      id: newAccount.id,
      username: username,
      type: type,
      profileImg: profileImg,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ error: "Invalid username or password!" });
    }

    const correctPassword = await validatePassword(password, account.password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Invalid username or password!" });
    }

    generateToken(account.id, account.username, res);

    res.status(200).json({
      id: account.id,
      username: account.username,
      profileImg: account.profileImg,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt").status(200).json({ message: "Logged Out!" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
