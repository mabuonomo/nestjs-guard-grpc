"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcAuthGuard = void 0;
class GrpcAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    getRequest(context) {
        return context.switchToRpc().getContext().req;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.getRequest(context);
            const type = context.getType();
            const prefix = 'Bearer ';
            let header;
            if (type === 'rpc') {
                const metadata = context.getArgByIndex(1);
                if (!metadata) {
                    return false;
                }
                header = metadata.get('Authorization')[0];
            }
            if (!header || !header.includes(prefix)) {
                return false;
            }
            const token = header.slice(header.indexOf(' ') + 1);
            const user = this.authService.verify(token);
            if (user === undefined) {
                return false;
            }
            request.user = user;
            return true;
        });
    }
}
exports.GrpcAuthGuard = GrpcAuthGuard;
//# sourceMappingURL=grpc.guard.js.map