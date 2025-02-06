import {
  loginService,
  logoutService,
  refreshAccessTokenService,
  signupService,
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
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  try {
    const logout = await logoutService(req);
    res.clearCookie("refreshToken").status(200).json({ message: logout });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    console.log(req.cookies);
    const accessToken = await refreshAccessTokenService(req);
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error in refresh token controller", error.message);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
