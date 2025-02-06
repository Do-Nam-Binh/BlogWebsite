import jwt from "jsonwebtoken";

export const generateToken = (account, secret, expiration) => {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  if (!expiration) {
    throw new Error("Expiration is not defined in the environment variables");
  }
  if (!account || !account.id || !account.email || !account.username) {
    throw new Error("Invalid account data for token generation.");
  }

  const token = jwt.sign(
    {
      id: account.id,
      email: account.email,
      username: account.username,
    },
    secret,
    {
      expiresIn: expiration,
    }
  );

  return token;
};
