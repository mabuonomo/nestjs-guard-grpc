"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_guard_grpc_service_1 = require("./nestjs-guard-grpc.service");
const jwt_service_1 = require("./jwt/jwt.service");
const grpc_guard_1 = require("./guard/grpc.guard");
let NestjsGuardGrpcModule = class NestjsGuardGrpcModule {
};
NestjsGuardGrpcModule = __decorate([
    common_1.Module({
        providers: [nestjs_guard_grpc_service_1.NestjsGuardGrpcService, jwt_service_1.JwtService],
        exports: [nestjs_guard_grpc_service_1.NestjsGuardGrpcService, grpc_guard_1.GrpcAuthGuard],
    })
], NestjsGuardGrpcModule);
exports.NestjsGuardGrpcModule = NestjsGuardGrpcModule;
//# sourceMappingURL=nestjs-guard-grpc.module.js.map