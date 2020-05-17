"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwks_rsa_1 = require("jwks-rsa");
class JwtService {
    constructor(options) {
        this.client = new jwks_rsa_1.JwksClient(options);
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