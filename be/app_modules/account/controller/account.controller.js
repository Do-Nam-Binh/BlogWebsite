import {
  loginService,
  refreshAccessTokenService,
  signupService,
} from "../service/account.service.js";

export const signup = async (req, res) => {
  try {
    await signupService(req, res);
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    await loginService(req, res);
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
    await refreshAccessTokenService(req, res);
  } catch (error) {
    console.error("Error in refresh token controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
