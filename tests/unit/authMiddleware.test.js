import { describe, it, expect, beforeEach, vi } from "vitest";
import { authMiddleware } from "../../src/auth/authMiddleware.js";
import { tokens } from "../../src/auth/tokenStore.js";

describe("authMiddleware", () => {
    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        next = vi.fn();

        // Reset token store before each test
        for (const key in tokens) {
            delete tokens[key];
        }
    });

    it("returns 401 if no authorization header", () => {
        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing token" });
        expect(next).not.toHaveBeenCalled();
    });

    it("returns 401 for invalid token", () => {
        req.headers.authorization = "Bearer fakeToken";

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
        expect(next).not.toHaveBeenCalled();
    });
});