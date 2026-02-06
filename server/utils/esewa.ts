import crypto from "crypto";


export const ESEWA_CONFIG = {
    PRODUCT_CODE: "EPAYTEST",
    SECRET_KEY: "8gBm/:&EnhH.1/q", // Standard v2 UAT key
};

/**
 * Generates a signature for eSewa v2.
 * The message format is: field1=val1,field2=val2...
 * 
 * @param data - Object containing the fields to be signed.
 * @param signedFieldNames - A comma-separated string of field names in the order they should be signed.
 * @param secretKey - The secret key provided by eSewa.
 * @returns The HMAC-SHA256 signature in Base64 format.
 */
export function generateEsewaSignature(
    data: Record<string, any>,
    signedFieldNames: string,
    secretKey: string = ESEWA_CONFIG.SECRET_KEY
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

/**
 * Verifies the signature received from eSewa.
 * 
 * @param data - Decoded data object from eSewa.
 * @param secretKey - The secret key provided by eSewa.
 * @returns boolean indicating if the signature is valid.
 */
export function verifyEsewaSignature(
    data: Record<string, any>,
    secretKey: string = ESEWA_CONFIG.SECRET_KEY
): boolean {
    const { signature, signed_field_names } = data;
    if (!signature || !signed_field_names) return false;

    const localSignature = generateEsewaSignature(data, signed_field_names, secretKey);
    return localSignature === signature;
}
