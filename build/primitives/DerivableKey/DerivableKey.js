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
exports.DerivableKey = void 0;
var hash_1 = require("../../Client/providers/LCDClient/util/hash");
var bech32_1 = require("bech32");
var elliptic = __importStar(require("elliptic"));
var DerivableKey = /** @class */ (function () {
    // @ts-ignore
    function DerivableKey(hdKey) {
        //@ts-ignore
        var buffPrivKey = Buffer.from(hdKey.privateKey);
        this.privateKey = buffPrivKey;
        this.hdKey = hdKey;
    }
    DerivableKey.prototype.derivePath = function (path) {
        var derivedHD = this.hdKey.derive(path);
        return new DerivableKey(derivedHD);
    };
    DerivableKey.prototype.toAddress = function () {
        var hash = (0, hash_1.ripemd160)((0, hash_1.sha256)(this.toPublic()));
        return bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(hash));
    };
    DerivableKey.prototype.toPrivate = function () {
        return this.privateKey;
    };
    DerivableKey.prototype.toPublic = function () {
        var ec = new elliptic.ec('secp256k1');
        var key = ec.keyFromPrivate(this.toPrivate());
        var publicKey = key.getPublic(true, 'hex');
        return Buffer.from(publicKey, 'hex');
    };
    DerivableKey.prototype.sign = function (message) {
        return this.hdKey.sign(message);
    };
    DerivableKey.prototype.verify = function (signature) {
        return this.hdKey.verify(signature);
    };
    return DerivableKey;
}());
exports.DerivableKey = DerivableKey;
//# sourceMappingURL=DerivableKey.js.map