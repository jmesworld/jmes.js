import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClearContractAdmin as MsgClearContractAdmin_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgClearAdmin as MsgClearAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
export declare class MsgClearContractAdmin extends JSONSerializable<MsgClearContractAdmin.Amino, MsgClearContractAdmin.Data, MsgClearContractAdmin.Proto> {
    admin: AccAddress;
    contract: AccAddress;
    /**
     * @param admin contract admin
     * @param contract contract address
     */
    constructor(admin: AccAddress, contract: AccAddress);
    static fromAmino(data: MsgClearContractAdmin.Amino, isClassic?: boolean): MsgClearContractAdmin;
    toAmino(isClassic?: boolean): MsgClearContractAdmin.Amino;
    static fromProto(data: MsgClearContractAdmin.Proto, isClassic?: boolean): MsgClearContractAdmin;
    toProto(isClassic?: boolean): MsgClearContractAdmin.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgClearContractAdmin;
    static fromData(data: MsgClearContractAdmin.Data, isClassic?: boolean): MsgClearContractAdmin;
    toData(isClassic?: boolean): MsgClearContractAdmin.Data;
}
export declare namespace MsgClearContractAdmin {
    interface AminoV1 {
        type: 'wasm/MsgClearContractAdmin';
        value: {
            admin: AccAddress;
            contract: AccAddress;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgClearAdmin';
        value: {
            sender: AccAddress;
            contract: AccAddress;
        };
    }
    interface DataV1 {
        '@type': '/jmes.wasm.v1beta1.MsgClearContractAdmin';
        admin: string;
        contract: string;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgClearAdmin';
        sender: string;
        contract: string;
    }
    type Amino = AminoV1 | AminoV2;
    type Data = DataV1 | DataV2;
    type Proto = MsgClearContractAdmin_legacy_pb | MsgClearAdmin_pb;
}
