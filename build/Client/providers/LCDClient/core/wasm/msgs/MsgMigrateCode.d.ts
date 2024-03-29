import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateCode as MsgMigrateCode_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
export declare class MsgMigrateCode extends JSONSerializable<MsgMigrateCode.Amino, MsgMigrateCode.Data, MsgMigrateCode.Proto> {
    sender: AccAddress;
    code_id: number;
    wasm_byte_code: string;
    /**
     * @param sender code migrator address
     * @param code_id reference to the code on the blockchain
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    constructor(sender: AccAddress, code_id: number, wasm_byte_code: string);
    static fromAmino(data: MsgMigrateCode.Amino, isClassic?: boolean): MsgMigrateCode;
    toAmino(isClassic?: boolean): MsgMigrateCode.Amino;
    static fromProto(proto: MsgMigrateCode.Proto, isClassic?: boolean): MsgMigrateCode;
    toProto(isClassic?: boolean): MsgMigrateCode.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgMigrateCode;
    static fromData(data: MsgMigrateCode.Data, isClassic?: boolean): MsgMigrateCode;
    toData(isClassic?: boolean): MsgMigrateCode.Data;
}
export declare namespace MsgMigrateCode {
    interface Amino {
        type: 'wasm/MsgMigrateCode';
        value: {
            code_id: string;
            sender: AccAddress;
            wasm_byte_code: string;
        };
    }
    interface Data {
        '@type': '/jmes.wasm.v1beta1.MsgMigrateCode';
        code_id: string;
        sender: AccAddress;
        wasm_byte_code: string;
    }
    type Proto = MsgMigrateCode_legacy_pb;
}
