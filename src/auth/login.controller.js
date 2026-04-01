import { tokens } from "./tokenStore.js";

import express from 'express';
import crypto from "crypto";

export class LoginController {
    constructor() {
        this.router = express.Router();

        this.router.post("/", this.getLoginToken.bind(this))
    }

    async getLoginToken(request, response) {
        try {
            console.log(request.body)
            const { username, password } = request.body || {};

            if (username === "admin" && password === "password") {
                const token = crypto.randomBytes(16).toString("hex");
                
                tokens[token] = { 
                    userId: 1,
                    expiresAt: Date.now() + 1000 * 60 * 15 // 15 minutes
                };
                console.log(tokens)
                return response.status(200).json({ token });
            }

            return response.status(401).json({ message: "Invalid credentials" });
        } catch(error) {
            console.log("it made it to error.")
            console.error(error);
            return response.status(500).json({ message: "Server error" });
        }
    }
}