const crypto = require("crypto");

const data = {
    transaction_code: "000E28M",
    status: "COMPLETE",
    total_amount: "1020.0",
    transaction_uuid: "ORDER-1770282246852-871",
    product_code: "EPAYTEST",
    signed_field_names: "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names"
};

const secretKey = "8gBm/:&EnhH.1/q";
const targetSignature = "kODnW6M1XMLBYsXM7uOgObvYnQsk86r4u7H46X1ncjk=";

const message = `transaction_code=${data.transaction_code},status=${data.status},total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code},signed_field_names=${data.signed_field_names}`;

const signature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

console.log(`Message: ${message}`);
console.log(`Generated Signature: ${signature}`);
console.log(`Target Signature: ${targetSignature}`);
console.log(`Match: ${signature === targetSignature}`);
