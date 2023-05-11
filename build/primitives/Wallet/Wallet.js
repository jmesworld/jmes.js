"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var Account_1 = require("../Account");
var Wallet = /** @class */ (function () {
    function Wallet(chainDerivedKey, lcdcInstance) {
        this.chainDerivedKey = chainDerivedKey;
        this.lcdcInstance = lcdcInstance !== null && lcdcInstance !== void 0 ? lcdcInstance : null;
    }
    Wallet.prototype.getAccount = function (index) {
        if (index === void 0) { index = 0; }
        return new Account_1.Account(this.chainDerivedKey, index, this.lcdcInstance);
    };
    Wallet.prototype.signMessage = function (message) {
        console.log({ message: message });
    };
    Wallet.prototype.broadcastSignedMessage = function (signedMessage) {
        console.log({ signedMessage: signedMessage });
    };
    return Wallet;
}());
exports.Wallet = Wallet;
;
//# sourceMappingURL=Wallet.js.map