import { tokens } from "./tokenStore.js";

import express from 'express';

export class LogoutController {
    constructor() {
        this.router = express.Router();

        this.router.post("/", this.logout.bind(this))
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization;

            delete tokens[token];

            return res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    }
}