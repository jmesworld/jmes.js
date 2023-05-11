"use strict";
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
            chainID: 'jmes-888',
            URL: 'http://51.38.52.37:1317',
            // Refers to the difference introduced with Phoenix-1 vs Columbus-6
            // on /cosmos/ pathing on MsgInstantiateContract
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
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map