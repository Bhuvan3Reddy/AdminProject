"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateHybrid = exports.authenticateCookie = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authenticateCookie = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ error: 'Authentication cookie required' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateCookie = authenticateCookie;
const authenticateHybrid = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    if (bearerToken) {
        try {
            const user = jsonwebtoken_1.default.verify(bearerToken, jwtSecret);
            req.user = user;
            return next();
        }
        catch (err) {
            // Silent fail, try cookie next
        }
    }
    const cookieToken = req.cookies.auth_token;
    if (cookieToken) {
        try {
            const user = jsonwebtoken_1.default.verify(cookieToken, jwtSecret);
            req.user = user;
            return next();
        }
        catch (err) {
            // Silent fail
        }
    }
    return res.status(401).json({ error: 'Authentication required' });
};
exports.authenticateHybrid = authenticateHybrid;
