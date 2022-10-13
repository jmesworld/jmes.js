"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var Account_1 = require("../Account");
var Wallet = /** @class */ (function () {
    function Wallet(chainDerivedKey) {
        this.chainDerivedKey = chainDerivedKey;
    }
    // getAccount(privateKey, index:number=0){
    Wallet.prototype.getAccount = function (index) {
        if (index === void 0) { index = 0; }
        console.log("GET ACCOUNT ".concat(index));
        return new Account_1.Account(this.chainDerivedKey, index);
        // this._privateKey = privateKey;
        // return new Account(, index)
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