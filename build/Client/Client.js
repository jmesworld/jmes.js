"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var Wallet_1 = require("../primitives/Wallet");
var DerivableKey_1 = require("../primitives/DerivableKey/DerivableKey");
var marketplaceAPI_1 = __importDefault(require("./providers/MarketplaceAPI/marketplaceAPI"));
var IdentityAPI_1 = __importDefault(require("./providers/IdentityAPI/IdentityAPI"));
var Client = /** @class */ (function () {
    function Client() {
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new marketplaceAPI_1.default(),
            identityAPI: new IdentityAPI_1.default()
        };
    }
    Client.prototype.createWallet = function (key) {
        // Where 8888 is specific JMES Path for mainnet.
        var bip44Path = "m/44'/330'";
        console.log("Generating a new wallet with key on BIP Path ".concat(bip44Path));
        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        var derivableKey = (key.toSeed) ? new DerivableKey_1.DerivableKey(key.toSeed()) : key;
        // @ts-ignore
        var chainDerivedKey = derivableKey.derivePath(bip44Path);
        return new Wallet_1.Wallet(chainDerivedKey);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map