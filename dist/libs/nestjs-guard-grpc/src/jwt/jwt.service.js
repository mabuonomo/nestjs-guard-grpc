"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jwt = require("jsonwebtoken");
class JwtService {
    constructor(options) {
    }
    verify(params) {
        return jwt.verify(params.token, this.getKey, params.options);
    }
    getKey(header, callback) {
        this.client.getSigningKey(header.kid, (err, key) => {
            const signingKey = key.getPublicKey() || key.rsaPublicKey;
            callback(null, signingKey);
        });
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map