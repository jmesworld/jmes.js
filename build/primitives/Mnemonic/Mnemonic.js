"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mnemonic = void 0;
var crypto = __importStar(require("crypto"));
var ethers_1 = require("ethers");
var bip39 = __importStar(require("bip39"));
var DerivableKey_1 = require("../DerivableKey");
var bip32 = __importStar(require("@scure/bip32"));
var Mnemonic = /** @class */ (function () {
    function Mnemonic(mnemonic) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
    }
    // @ts-ignore
    Mnemonic.generateMnemonic = function (overwroteRandomBytes) {
        if (overwroteRandomBytes === void 0) { overwroteRandomBytes = null; }
        var getRandomValuesFn = (crypto && crypto.webcrypto)
            // FIX: Binding done to fix specific issue with nodev18 (https://github.com/cloudflare/miniflare/pull/216)
            ? crypto.webcrypto.getRandomValues.bind(crypto.webcrypto)
            : crypto.getRandomValues;
        var uintArray = new Uint8Array(32);
        // @ts-ignore
        var randomBytes = (overwroteRandomBytes !== null) ? overwroteRandomBytes : getRandomValuesFn(uintArray);
        // @ts-ignore
        var mnemonic = ethers_1.ethers.utils.entropyToMnemonic(randomBytes);
        return mnemonic;
    };
    Mnemonic.mnemonicToSeed = function (mnemonic) {
        return bip39.mnemonicToSeedSync(mnemonic);
    };
    Mnemonic.prototype.toSeed = function () {
        return Mnemonic.mnemonicToSeed(this.mnemonic);
    };
    // @ts-ignore
    Mnemonic.prototype.toMasterDerivableKey = function (opts) {
        if (opts === void 0) { opts = { account: 0, index: 0 }; }
        var seed = this.toSeed();
        var masterKey = bip32.HDKey.fromMasterSeed(seed);
        return new DerivableKey_1.DerivableKey(masterKey);
    };
    return Mnemonic;
}());
exports.Mnemonic = Mnemonic;
;
//# sourceMappingURL=Mnemonic.js.map