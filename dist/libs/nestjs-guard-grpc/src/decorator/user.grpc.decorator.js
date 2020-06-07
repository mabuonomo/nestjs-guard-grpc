"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRPCUser = void 0;
const common_1 = require("@nestjs/common");
const camelcaseKeys = require('camelcase-keys');
exports.GRPCUser = common_1.createParamDecorator((data, context) => {
    return camelcaseKeys(context.switchToRpc().getContext().user);
});
//# sourceMappingURL=user.grpc.decorator.js.map