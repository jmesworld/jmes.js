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
var Mnemonic = /** @class */ (function () {
    function Mnemonic(mnemonic) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
    }
    // @ts-ignore
    Mnemonic.generateMnemonic = function (getRandomValuesFn) {
        if (getRandomValuesFn === void 0) { getRandomValuesFn = (crypto && crypto.webcrypto) ? crypto.webcrypto.getRandomValues : crypto.getRandomValues; }
        var uintArray = new Uint8Array(32);
        var randomBytes = getRandomValuesFn(uintArray);
        var mnemonic = ethers_1.ethers.utils.entropyToMnemonic(randomBytes);
        return mnemonic;
    };
    Mnemonic.mnemonicToSeed = function (mnemonic) {
        var seed = bip39.mnemonicToSeedSync(mnemonic);
        return seed.toString('hex');
    };
    Mnemonic.prototype.toSeed = function () {
        return Mnemonic.mnemonicToSeed(this.mnemonic);
    };
    return Mnemonic;
}());
exports.Mnemonic = Mnemonic;
;
//# sourceMappingURL=Mnemonic.js.map