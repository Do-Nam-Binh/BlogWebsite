import jwt from "jsonwebtoken";

export const generateToken = (accountId, username, res) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign(
    { accountId, username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10d", // Token expires in 10 days
    }
  );

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
    httpOnly: true, // Prevent access to cookies via JavaScript
    sameSite: "Strict", // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== "production", // Secure only in production
  });
};
