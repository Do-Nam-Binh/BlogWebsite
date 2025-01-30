import crypto from "crypto";

export const generateHexId = (dataType) =>
  dataType[0] + crypto.randomBytes(16).toString("hex");
