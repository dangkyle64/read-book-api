import { tokens } from "./tokenStore.js";

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({ message: "Missing token" });
        }

        const token = authHeader.split(" ")[1];

        const session = tokens[token];

        if (!session) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = session;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}