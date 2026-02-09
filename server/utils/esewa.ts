import crypto from "crypto";

export const ESEWA_CONFIG = {
  PRODUCT_CODE: "EPAYTEST",
  SECRET_KEY: "8gBm/:&EnhH.1/q", // Standard v2 UAT key
};

export function generateEsewaSignature(
  data: Record<string, any>,
  signedFieldNames: string,
  secretKey: string = ESEWA_CONFIG.SECRET_KEY,
): string {
  const fieldNames = signedFieldNames.split(",");
  const message = fieldNames
    .map((field) => {
      const value = data[field];
      return `${field}=${value}`;
    })
    .join(",");

  return crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");
}

export function verifyEsewaSignature(
  data: Record<string, any>,
  secretKey: string = ESEWA_CONFIG.SECRET_KEY,
): boolean {
  const { signature, signed_field_names } = data;
  if (!signature || !signed_field_names) return false;

  const localSignature = generateEsewaSignature(
    data,
    signed_field_names,
    secretKey,
  );
  return localSignature === signature;
}
