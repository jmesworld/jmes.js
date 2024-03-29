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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgExecuteContract = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
var tx_2 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/tx");
var MsgExecuteContract = /** @class */ (function (_super) {
    __extends(MsgExecuteContract, _super);
    /**
     * @param sender contract user
     * @param contract contract address
     * @param execute_msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    function MsgExecuteContract(sender, contract, execute_msg, coins) {
        if (coins === void 0) { coins = {}; }
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.contract = contract;
        _this.execute_msg = execute_msg;
        _this.coins = new Coins_1.Coins(coins);
        return _this;
    }
    MsgExecuteContract.fromAmino = function (data, isClassic) {
        if (isClassic) {
            var _a = data.value, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
            return new MsgExecuteContract(sender, contract, execute_msg, Coins_1.Coins.fromAmino(coins));
        }
        else {
            var _b = data.value, sender = _b.sender, contract = _b.contract, msg = _b.msg, funds = _b.funds;
            return new MsgExecuteContract(sender, contract, msg, Coins_1.Coins.fromAmino(funds));
        }
    };
    MsgExecuteContract.prototype.toAmino = function (isClassic) {
        var _a = this, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        if (isClassic) {
            return {
                type: 'wasm/MsgExecuteContract',
                value: {
                    sender: sender,
                    contract: contract,
                    execute_msg: (0, json_1.removeNull)(execute_msg),
                    coins: coins.toAmino(),
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgExecuteContract',
                value: {
                    sender: sender,
                    contract: contract,
                    msg: (0, json_1.removeNull)(execute_msg),
                    funds: coins.toAmino(),
                },
            };
        }
    };
    MsgExecuteContract.fromProto = function (proto, isClassic) {
        if (isClassic) {
            var p = proto;
            return new MsgExecuteContract(p.sender, p.contract, JSON.parse(Buffer.from(p.executeMsg).toString('utf-8')), Coins_1.Coins.fromProto(p.coins));
        }
        else {
            var p = proto;
            return new MsgExecuteContract(p.sender, p.contract, JSON.parse(Buffer.from(p.msg).toString('utf-8')), Coins_1.Coins.fromProto(p.funds));
        }
    };
    MsgExecuteContract.prototype.toProto = function (isClassic) {
        var _a = this, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        if (isClassic) {
            return tx_1.MsgExecuteContract.fromPartial({
                coins: coins.toProto(),
                contract: contract,
                sender: sender,
                executeMsg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
            });
        }
        else {
            return tx_2.MsgExecuteContract.fromPartial({
                funds: coins.toProto(),
                contract: contract,
                sender: sender,
                msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
            });
        }
    };
    MsgExecuteContract.prototype.packAny = function (isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgExecuteContract',
                value: tx_1.MsgExecuteContract.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                value: tx_2.MsgExecuteContract.encode(this.toProto(isClassic)).finish(),
            });
        }
    };
    MsgExecuteContract.unpackAny = function (msgAny, isClassic) {
        return MsgExecuteContract.fromProto(isClassic
            ? tx_1.MsgExecuteContract.decode(msgAny.value)
            : tx_2.MsgExecuteContract.decode(msgAny.value), isClassic);
    };
    MsgExecuteContract.fromData = function (data, isClassic) {
        if (isClassic) {
            var _a = data, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
            return new MsgExecuteContract(sender, contract, execute_msg, Coins_1.Coins.fromData(coins));
        }
        else {
            var _b = data, sender = _b.sender, contract = _b.contract, msg = _b.msg, funds = _b.funds;
            return new MsgExecuteContract(sender, contract, msg, Coins_1.Coins.fromData(funds));
        }
    };
    MsgExecuteContract.prototype.toData = function (isClassic) {
        var _a = this, sender = _a.sender, contract = _a.contract, execute_msg = _a.execute_msg, coins = _a.coins;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgExecuteContract',
                sender: sender,
                contract: contract,
                execute_msg: execute_msg,
                coins: coins.toData(),
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
                sender: sender,
                contract: contract,
                msg: execute_msg,
                funds: coins.toData(),
            };
        }
    };
    return MsgExecuteContract;
}(json_1.JSONSerializable));
exports.MsgExecuteContract = MsgExecuteContract;
//# sourceMappingURL=MsgExecuteContract.js.map