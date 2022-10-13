"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getIdentity_1 = __importDefault(require("./methods/getIdentity"));
var createIdentity_1 = __importDefault(require("./methods/createIdentity"));
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
var IdentityAPI = /** @class */ (function () {
    function IdentityAPI() {
        this.endpoint = {
            url: 'http://localhost:3001'
        };
    }
    return IdentityAPI;
}());
exports.default = IdentityAPI;
;
IdentityAPI.prototype.getIdentity = getIdentity_1.default;
IdentityAPI.prototype.createIdentity = createIdentity_1.default;
//# sourceMappingURL=IdentityAPI.js.map