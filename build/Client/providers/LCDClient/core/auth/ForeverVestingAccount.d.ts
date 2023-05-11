import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { PublicKey } from '../PublicKey';
import { ForeverVestingAccount as ForeverVestingAccount_pb } from 'jmes.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * ForeverVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export declare class ForeverVestingAccount extends JSONSerializable<ForeverVestingAccount.Amino, ForeverVestingAccount.Data, ForeverVestingAccount.Proto> {
    base_vesting_account: BaseVestingAccount;
    vesting_supply_percentage: string;
    /**
     *
     * @param base_vesting_account account information
     * @param vesting_supply_percentage vesting_supply_percentage
     */
    constructor(base_vesting_account: BaseVestingAccount, vesting_supply_percentage: string);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): ForeverVestingAccount.Amino;
    static fromAmino(data: ForeverVestingAccount.Amino, isClassic?: boolean): ForeverVestingAccount;
    toData(isClassic?: boolean): ForeverVestingAccount.Data;
    static fromData(data: ForeverVestingAccount.Data, isClassic?: boolean): ForeverVestingAccount;
    toProto(isClassic?: boolean): ForeverVestingAccount.Proto;
    static fromProto(ForeverVestingAccountProto: ForeverVestingAccount.Proto, isClassic?: boolean): ForeverVestingAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): ForeverVestingAccount;
}
export declare namespace ForeverVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/ForeverVestingAccount';
        value: {
            base_vesting_account: BaseVestingAccount.AminoValue;
            vesting_supply_percentage: string;
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.ForeverVestingAccount';
        base_vesting_account: BaseVestingAccount.DataValue;
        vesting_supply_percentage: string;
    }
    type Proto = ForeverVestingAccount_pb;
}
