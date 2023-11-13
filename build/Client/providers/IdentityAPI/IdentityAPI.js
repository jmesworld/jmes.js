"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getIdentity_1 = __importDefault(require("./methods/getIdentity"));
var getToken_1 = __importDefault(require("./methods/getToken"));
var createIdentity_1 = __importDefault(require("./methods/createIdentity"));
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
var IdentityAPI = /** @class */ (function () {
    function IdentityAPI(config) {
        var _a, _b;
        this.endpoint = {
            api_url: (_b = (_a = config === null || config === void 0 ? void 0 : config.endpoint) === null || _a === void 0 ? void 0 : _a.api_url) !== null && _b !== void 0 ? _b : 'http://87.98.243.34:3001'
        };
    }
    return IdentityAPI;
}());
exports.default = IdentityAPI;
;
IdentityAPI.prototype.getIdentity = getIdentity_1.default;
IdentityAPI.prototype.getToken = getToken_1.default;
IdentityAPI.prototype.createIdentity = createIdentity_1.default;
//# sourceMappingURL=IdentityAPI.js.map