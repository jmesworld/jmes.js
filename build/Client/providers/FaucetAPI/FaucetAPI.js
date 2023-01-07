"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestCredit_1 = __importDefault(require("./methods/requestCredit"));
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
var FaucetAPI = /** @class */ (function () {
    function FaucetAPI(config) {
        var _a, _b;
        this.endpoint = {
            api_url: (_b = (_a = config === null || config === void 0 ? void 0 : config.endpoint) === null || _a === void 0 ? void 0 : _a.api_url) !== null && _b !== void 0 ? _b : 'http://51.38.52.37:3002'
        };
    }
    return FaucetAPI;
}());
exports.default = FaucetAPI;
;
FaucetAPI.prototype.requestCredit = requestCredit_1.default;
//# sourceMappingURL=FaucetAPI.js.map