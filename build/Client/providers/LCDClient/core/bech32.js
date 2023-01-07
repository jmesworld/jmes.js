"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValConsAddress = exports.ValPubKey = exports.ValAddress = exports.AccPubKey = exports.AccAddress = void 0;
var bech32_1 = require("bech32");
function checkPrefixAndLength(prefix, data, length) {
    try {
        var vals = bech32_1.bech32.decode(data);
        return vals.prefix === prefix && data.length == length;
    }
    catch (e) {
        return false;
    }
}
var AccAddress;
(function (AccAddress) {
    /**
     * Checks if a string is a valid Terra account address.
     *
     * @param data string to check
     */
    function validate(data) {
        // 44 for normal account and 64 for contract account
        return (checkPrefixAndLength('jmes', data, 44) ||
            checkPrefixAndLength('jmes', data, 64));
    }
    AccAddress.validate = validate;
    /**
     * Converts a validator address into an account address
     *
     * @param address validator address
     */
    function fromValAddress(address) {
        var vals = bech32_1.bech32.decode(address);
        return bech32_1.bech32.encode('jmes', vals.words);
    }
    AccAddress.fromValAddress = fromValAddress;
})(AccAddress = exports.AccAddress || (exports.AccAddress = {}));
var AccPubKey;
(function (AccPubKey) {
    /**
     * Checks if a string is a jmes account's public key
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('jmespub', data, 47);
    }
    AccPubKey.validate = validate;
    /**
     * Converts a jmes validator pubkey to an account pubkey.
     * @param address validator pubkey to convert
     */
    function fromAccAddress(address) {
        var vals = bech32_1.bech32.decode(address);
        return bech32_1.bech32.encode('jmespub', vals.words);
    }
    AccPubKey.fromAccAddress = fromAccAddress;
})(AccPubKey = exports.AccPubKey || (exports.AccPubKey = {}));
var ValAddress;
(function (ValAddress) {
    /**
     * Checks if a string is a jmes validator address.
     *
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('jmesvaloper', data, 51);
    }
    ValAddress.validate = validate;
    /**
     * Converts a jmes account address to a validator address.
     * @param address account address to convert
     */
    function fromAccAddress(address) {
        var vals = bech32_1.bech32.decode(address);
        return bech32_1.bech32.encode('jmesvaloper', vals.words);
    }
    ValAddress.fromAccAddress = fromAccAddress;
})(ValAddress = exports.ValAddress || (exports.ValAddress = {}));
var ValPubKey;
(function (ValPubKey) {
    /**
     * Checks if a string is a jmes validator pubkey
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('jmesvaloperpub', data, 54);
    }
    ValPubKey.validate = validate;
    /**
     * Converts a jmes validator operator address to a validator pubkey.
     * @param valAddress account pubkey
     */
    function fromValAddress(valAddress) {
        var vals = bech32_1.bech32.decode(valAddress);
        return bech32_1.bech32.encode('jmesvaloperpub', vals.words);
    }
    ValPubKey.fromValAddress = fromValAddress;
})(ValPubKey = exports.ValPubKey || (exports.ValPubKey = {}));
var ValConsAddress;
(function (ValConsAddress) {
    /**
     * Checks if a string is a jmes validator consensus address
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('jmesvalcons', data, 51);
    }
    ValConsAddress.validate = validate;
})(ValConsAddress = exports.ValConsAddress || (exports.ValConsAddress = {}));
//# sourceMappingURL=bech32.js.map