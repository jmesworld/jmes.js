"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeverVestingAccount = void 0;
var json_1 = require("../../util/json");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
var vesting_1 = require("jmes.proto/cosmos/vesting/v1beta1/vesting");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
/**
 * ForeverVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
var ForeverVestingAccount = /** @class */ (function (_super) {
    __extends(ForeverVestingAccount, _super);
    /**
     *
     * @param base_vesting_account account information
     * @param vesting_supply_percentage vesting_supply_percentage
     */
    function ForeverVestingAccount(base_vesting_account, vesting_supply_percentage) {
        var _this = _super.call(this) || this;
        _this.base_vesting_account = base_vesting_account;
        _this.vesting_supply_percentage = vesting_supply_percentage;
        return _this;
    }
    ForeverVestingAccount.prototype.getAccountNumber = function () {
        return this.base_vesting_account.getAccountNumber();
    };
    ForeverVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_vesting_account.getSequenceNumber();
    };
    ForeverVestingAccount.prototype.getPublicKey = function () {
        return this.base_vesting_account.base_account.public_key;
    };
    ForeverVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_supply_percentage = _a.vesting_supply_percentage;
        return {
            type: 'cosmos-sdk/ForeverVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                vesting_supply_percentage: vesting_supply_percentage,
            },
        };
    };
    ForeverVestingAccount.fromAmino = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'cosmos-sdk/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new ForeverVestingAccount(base_vesting_account, data.value.vesting_supply_percentage);
    };
    ForeverVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_supply_percentage = _a.vesting_supply_percentage;
        return {
            '@type': '/cosmos.vesting.v1beta1.ForeverVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            vesting_supply_percentage: vesting_supply_percentage.toString()
        };
    };
    ForeverVestingAccount.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(__assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        return new ForeverVestingAccount(base_vesting_account, data.vesting_supply_percentage);
    };
    ForeverVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_supply_percentage = _a.vesting_supply_percentage;
        return vesting_1.ForeverVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            // @ts-ignore
            vesting_supply_percentage: vesting_supply_percentage,
        });
    };
    ForeverVestingAccount.fromProto = function (ForeverVestingAccountProto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(ForeverVestingAccountProto.baseVestingAccount);
        return new ForeverVestingAccount(baseVestingAccount, ForeverVestingAccountProto.vestingSupplyPercentage);
    };
    ForeverVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.ForeverVestingAccount',
            value: vesting_1.ForeverVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    ForeverVestingAccount.unpackAny = function (pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return ForeverVestingAccount.fromProto(vesting_1.ForeverVestingAccount.decode(pubkeyAny.value), isClassic);
    };
    return ForeverVestingAccount;
}(json_1.JSONSerializable));
exports.ForeverVestingAccount = ForeverVestingAccount;
//# sourceMappingURL=ForeverVestingAccount.js.map