"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var Wallet_1 = require("../primitives/Wallet");
var MarketplaceAPI_1 = __importDefault(require("./providers/MarketplaceAPI/MarketplaceAPI"));
var IdentityAPI_1 = __importDefault(require("./providers/IdentityAPI/IdentityAPI"));
var FaucetAPI_1 = __importDefault(require("./providers/FaucetAPI/FaucetAPI"));
var LCDClient_1 = require("./providers/LCDClient/lcd/LCDClient");
var CONSTANTS_1 = require("../CONSTANTS");
var Client = /** @class */ (function () {
    function Client(config) {
        var _a, _b, _c, _d, _e;
        var lcdcConfig = (_b = (_a = config === null || config === void 0 ? void 0 : config.providers) === null || _a === void 0 ? void 0 : _a.LCDC) !== null && _b !== void 0 ? _b : {
            chainID: 'jmes-picasso',
            URL: 'http://51.91.75.10:1317',
            isClassic: false,
        };
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI_1.default((_c = config === null || config === void 0 ? void 0 : config.providers) === null || _c === void 0 ? void 0 : _c.marketplaceAPI),
            identityAPI: new IdentityAPI_1.default((_d = config === null || config === void 0 ? void 0 : config.providers) === null || _d === void 0 ? void 0 : _d.identityAPI),
            faucetAPI: new FaucetAPI_1.default((_e = config === null || config === void 0 ? void 0 : config.providers) === null || _e === void 0 ? void 0 : _e.faucetAPI),
            LCDC: new LCDClient_1.LCDClient(lcdcConfig)
        };
    }
    Client.prototype.createWallet = function (key) {
        // Where 8888 is specific JMES Path for mainnet.
        // jmes-888 in testnet
        var bip44Path = "m/44'/".concat(CONSTANTS_1.JMES_COIN_TYPE, "'");
        console.log("Generating a new wallet with key on BIP Path ".concat(bip44Path));
        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        var derivableKey = (key.toMasterDerivableKey) ? key.toMasterDerivableKey() : key;
        // @ts-ignore
        var chainDerivedKey = derivableKey.derivePath(bip44Path);
        return new Wallet_1.Wallet(chainDerivedKey, this.providers.LCDC);
    };
    Client.prototype.getSupply = function (denom) {
        if (denom === void 0) { denom = "ujmes"; }
        return __awaiter(this, void 0, void 0, function () {
            var total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.providers.LCDC.bank.total()];
                    case 1:
                        total = _a.sent();
                        return [2 /*return*/, total[0].get(denom)];
                }
            });
        });
    };
    Client.prototype.getValidatorInfo = function (validatorAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var commission, validator, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!validatorAddress)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.providers.LCDC.distribution.validatorCommission(validatorAddress)];
                    case 1:
                        commission = _b.sent();
                        _a = [{ rewards: {
                                    commission: commission.get('ujmes')
                                } }];
                        return [4 /*yield*/, this.providers.LCDC.staking.validator(validatorAddress)];
                    case 2:
                        validator = __assign.apply(void 0, _a.concat([_b.sent()]));
                        return [2 /*return*/, validator];
                }
            });
        });
    };
    Client.prototype.getValidators = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.providers.LCDC.staking.validators(params)];
            });
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map