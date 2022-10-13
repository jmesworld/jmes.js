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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DerivableKey = void 0;
var bip32_1 = __importDefault(require("bip32"));
var ecc = __importStar(require("tiny-secp256k1"));
var bech32_1 = require("bech32");
var DerivableKey = /** @class */ (function () {
    function DerivableKey(privateKey) {
        this.privateKey = (privateKey !== null) ? privateKey : null;
        if (privateKey) {
            this.privateKey = privateKey;
        }
    }
    DerivableKey.prototype.derivePath = function (path) {
        console.log('Derive path', path);
        var bip32 = (0, bip32_1.default)(ecc);
        var node = bip32.fromSeed(Buffer.from(this.privateKey, 'hex'));
        var child = node.derivePath(path);
        // @ts-ignore
        return new DerivableKey(child.privateKey.toString('hex'));
    };
    DerivableKey.prototype.toAddress = function () {
        var bip32 = (0, bip32_1.default)(ecc);
        var node = bip32.fromSeed(Buffer.from(this.privateKey, 'hex'));
        // @ts-ignore
        var address = bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(node.identifier));
        // @ts-ignore
        return address;
    };
    return DerivableKey;
}());
exports.DerivableKey = DerivableKey;
//# sourceMappingURL=DerivableKey.js.map