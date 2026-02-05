import crypto from "crypto";

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

const formats = [
    // 1. key=value
    () => {
        const fields = data.signed_field_names.split(',');
        return fields.map(field => `${field}=${data[field]}`).join(',');
    },
    // 2. key=value (without signed_field_names at the end?) - unlikely
    () => {
        const fields = data.signed_field_names.split(',').filter(f => f !== 'signed_field_names');
        return fields.map(field => `${field}=${data[field]}`).join(',');
    },
    // 3. just value
    () => {
        const fields = data.signed_field_names.split(',');
        return fields.map(field => data[field]).join(',');
    },
    // 4. key=value with spaces?
    () => {
        const fields = data.signed_field_names.split(',');
        return fields.map(field => `${field}= ${data[field]}`).join(',');
    }
];

formats.forEach((formatFn, index) => {
    const message = formatFn();
    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(message)
        .digest("base64");

    console.log(`Format ${index + 1}: ${message}`);
    console.log(`Signature: ${signature}`);
    console.log(`Match: ${signature === targetSignature}`);
    console.log('---');
});
