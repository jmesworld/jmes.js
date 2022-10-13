"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DerivableKey = void 0;
var HDKey = require("@scure/bip32").HDKey;
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
        var node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        var child = node.derive(path);
        return new DerivableKey(Buffer.from(child.privateKey).toString('hex'));
    };
    DerivableKey.prototype.toAddress = function () {
        var node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        return bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(node.identifier));
    };
    return DerivableKey;
}());
exports.DerivableKey = DerivableKey;
//# sourceMappingURL=DerivableKey.js.map