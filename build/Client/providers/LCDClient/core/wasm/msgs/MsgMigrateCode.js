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
exports.MsgMigrateCode = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
var Long = __importStar(require("long"));
var MsgMigrateCode = /** @class */ (function (_super) {
    __extends(MsgMigrateCode, _super);
    /**
     * @param sender code migrator address
     * @param code_id reference to the code on the blockchain
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    function MsgMigrateCode(sender, code_id, wasm_byte_code) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.code_id = code_id;
        _this.wasm_byte_code = wasm_byte_code;
        return _this;
    }
    MsgMigrateCode.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, sender = _a.sender, code_id = _a.code_id, wasm_byte_code = _a.wasm_byte_code;
        return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
    };
    MsgMigrateCode.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, sender = _a.sender, code_id = _a.code_id, wasm_byte_code = _a.wasm_byte_code;
        return {
            type: 'wasm/MsgMigrateCode',
            value: {
                sender: sender,
                code_id: code_id.toFixed(),
                wasm_byte_code: wasm_byte_code,
            },
        };
    };
    MsgMigrateCode.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgMigrateCode(proto.sender, proto.codeId.toNumber(), Buffer.from(proto.wasmByteCode).toString('base64'));
    };
    MsgMigrateCode.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, sender = _a.sender, code_id = _a.code_id, wasm_byte_code = _a.wasm_byte_code;
        return tx_1.MsgMigrateCode.fromPartial({
            codeId: Long.fromNumber(code_id),
            sender: sender,
            wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
        });
    };
    MsgMigrateCode.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/jmes.wasm.v1beta1.MsgMigrateCode',
            value: tx_1.MsgMigrateCode.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgMigrateCode.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgMigrateCode.fromProto(tx_1.MsgMigrateCode.decode(msgAny.value), isClassic);
    };
    MsgMigrateCode.fromData = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var sender = data.sender, code_id = data.code_id, wasm_byte_code = data.wasm_byte_code;
        return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
    };
    MsgMigrateCode.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, sender = _a.sender, code_id = _a.code_id, wasm_byte_code = _a.wasm_byte_code;
        return {
            '@type': '/jmes.wasm.v1beta1.MsgMigrateCode',
            sender: sender,
            code_id: code_id.toFixed(),
            wasm_byte_code: wasm_byte_code,
        };
    };
    return MsgMigrateCode;
}(json_1.JSONSerializable));
exports.MsgMigrateCode = MsgMigrateCode;
//# sourceMappingURL=MsgMigrateCode.js.map