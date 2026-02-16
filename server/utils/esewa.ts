import crypto from "crypto";

export function generateEsewaSignature(
  data: Record<string, any>,
  signedFieldNames: string,
  secretKey: string,
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
  secretKey: string,
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
