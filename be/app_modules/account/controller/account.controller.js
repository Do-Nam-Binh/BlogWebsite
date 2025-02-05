import {
  loginService,
  refreshAccessTokenService,
  signupService,
  googleLoginService,
} from "../service/account.service.js";

export const signup = async (req, res) => {
  try {
    const newAccount = await signupService(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth/refresh-token",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await googleLoginService(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/api/auth/refresh-token",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in Google login controller", error.message);
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
