import jwt from 'jsonwebtoken';

const RUNTIME_CONFIG = useRuntimeConfig();
const JWT_SECRET = RUNTIME_CONFIG.JWT_SECRET || 'default_secret_please_change';

export const signToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
};
