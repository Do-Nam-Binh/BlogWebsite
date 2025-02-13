import jwt from "jsonwebtoken";
import Account from "../../account/entity/account.model.js";
import dotenv from "dotenv";

dotenv.config();

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export const protectRoute =
  (allowedRoles = []) =>
  async (req, res, next) => {
    try {
      const token = extractToken(req);

      // Check if the token exists
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided!" });
      }

      // Verify the token and handle token expiry
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch the Account linked to the email in the token
        const account = await Account.findOne({ email: decoded.email });

        if (!account) {
          return res
            .status(401)
            .json({ error: "Unauthorized: Account not found!" });
        }

        // Check if the role is allowed
        if (!allowedRoles.includes(account.type)) {
          return res.status(403).json({
            error: "Forbidden: You do not have access to this resource!",
          });
        }

        // Attach account to the request
        req.account = account;

        // Proceed to the next middleware or route
        next();
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          // Token expired
          return res.status(401).json({
            error: "Unauthorized: Token has expired. Please log in again.",
          });
        }

        // If other JWT errors occur, handle them
        console.error("Error in protectRoute middleware:", err.message);
        return res.status(401).json({ error: "Unauthorized: Invalid token!" });
      }
    } catch (error) {
      console.error("Error in protectRoute middleware:", error.message);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  };
