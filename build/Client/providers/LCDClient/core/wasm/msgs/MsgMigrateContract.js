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
exports.MsgMigrateContract = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
var tx_2 = require("@terra-money/terra.proto/cosmwasm/wasm/v1/tx");
var Long = __importStar(require("long"));
var MsgMigrateContract = /** @class */ (function (_super) {
    __extends(MsgMigrateContract, _super);
    /**
     * @param admin contract admin
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    function MsgMigrateContract(admin, contract, new_code_id, migrate_msg // json object or string
    ) {
        var _this = _super.call(this) || this;
        _this.admin = admin;
        _this.contract = contract;
        _this.new_code_id = new_code_id;
        _this.migrate_msg = migrate_msg;
        return _this;
    }
    MsgMigrateContract.fromAmino = function (data, isClassic) {
        if (isClassic) {
            var _a = data.value, admin = _a.admin, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
            return new MsgMigrateContract(admin, contract, Number.parseInt(new_code_id), migrate_msg);
        }
        else {
            var _b = data.value, sender = _b.sender, contract = _b.contract, code_id = _b.code_id, msg = _b.msg;
            return new MsgMigrateContract(sender, contract, Number.parseInt(code_id), msg);
        }
    };
    MsgMigrateContract.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            var _a = this, admin = _a.admin, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
            return {
                type: 'wasm/MsgMigrateContract',
                value: {
                    admin: admin,
                    contract: contract,
                    new_code_id: new_code_id.toFixed(),
                    migrate_msg: (0, json_1.removeNull)(migrate_msg),
                },
            };
        }
        else {
            var _b = this, admin = _b.admin, contract = _b.contract, new_code_id = _b.new_code_id, migrate_msg = _b.migrate_msg;
            return {
                type: 'wasm/MsgMigrateContract',
                value: {
                    sender: admin,
                    contract: contract,
                    code_id: new_code_id.toFixed(),
                    msg: (0, json_1.removeNull)(migrate_msg),
                },
            };
        }
    };
    MsgMigrateContract.fromProto = function (proto, isClassic) {
        if (isClassic) {
            var p = proto;
            return new MsgMigrateContract(p.admin, p.contract, p.newCodeId.toNumber(), JSON.parse(Buffer.from(p.migrateMsg).toString('utf-8')));
        }
        else {
            var p = proto;
            return new MsgMigrateContract(p.sender, p.contract, p.codeId.toNumber(), JSON.parse(Buffer.from(p.msg).toString('utf-8')));
        }
    };
    MsgMigrateContract.prototype.toProto = function (isClassic) {
        var _a = this, admin = _a.admin, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        if (isClassic) {
            return tx_1.MsgMigrateContract.fromPartial({
                admin: admin,
                contract: contract,
                newCodeId: Long.fromNumber(new_code_id),
                migrateMsg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
            });
        }
        else {
            return tx_2.MsgMigrateContract.fromPartial({
                sender: admin,
                contract: contract,
                codeId: Long.fromNumber(new_code_id),
                msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
            });
        }
    };
    MsgMigrateContract.prototype.packAny = function (isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgMigrateContract',
                value: tx_1.MsgMigrateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
                value: tx_2.MsgMigrateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
    };
    MsgMigrateContract.unpackAny = function (msgAny, isClassic) {
        return MsgMigrateContract.fromProto(isClassic
            ? tx_1.MsgMigrateContract.decode(msgAny.value)
            : tx_2.MsgMigrateContract.decode(msgAny.value), isClassic);
    };
    MsgMigrateContract.fromData = function (data, isClassic) {
        if (isClassic) {
            var _a = data, admin = _a.admin, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
            return new MsgMigrateContract(admin, contract, Number.parseInt(new_code_id), migrate_msg);
        }
        else {
            var _b = data, sender = _b.sender, contract = _b.contract, code_id = _b.code_id, msg = _b.msg;
            return new MsgMigrateContract(sender, contract, Number.parseInt(code_id), msg);
        }
    };
    MsgMigrateContract.prototype.toData = function (isClassic) {
        var _a = this, admin = _a.admin, contract = _a.contract, new_code_id = _a.new_code_id, migrate_msg = _a.migrate_msg;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgMigrateContract',
                admin: admin,
                contract: contract,
                new_code_id: new_code_id.toFixed(),
                migrate_msg: (0, json_1.removeNull)(migrate_msg),
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
                sender: admin,
                contract: contract,
                code_id: new_code_id.toFixed(),
                msg: (0, json_1.removeNull)(migrate_msg),
            };
        }
    };
    return MsgMigrateContract;
}(json_1.JSONSerializable));
exports.MsgMigrateContract = MsgMigrateContract;
//# sourceMappingURL=MsgMigrateContract.js.map