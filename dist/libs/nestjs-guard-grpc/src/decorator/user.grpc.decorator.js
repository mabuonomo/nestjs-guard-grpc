"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GRPCUser = common_1.createParamDecorator((data, context) => {
    return context.switchToRpc().getContext().req.user;
});
//# sourceMappingURL=user.grpc.decorator.js.map