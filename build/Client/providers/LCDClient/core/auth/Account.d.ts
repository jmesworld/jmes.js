import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { BaseAccount } from './BaseAccount';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
import { ContinuousVestingAccount } from './ContinuousVestingAccount';
import { DelayedVestingAccount } from './DelayedVestingAccount';
import { PeriodicVestingAccount } from './PeriodicVestingAccount';
import { BaseVestingAccount } from './BaseVestingAccount';
import { ForeverVestingAccount } from './ForeverVestingAccount';
export declare type Account = BaseAccount | BaseVestingAccount | LazyGradedVestingAccount | ContinuousVestingAccount | DelayedVestingAccount | ForeverVestingAccount | PeriodicVestingAccount;
/**
 * Stores information about an account fetched from the blockchain.
 */
export declare namespace Account {
    type Amino = BaseAccount.Amino | BaseVestingAccount.Amino | LazyGradedVestingAccount.Amino | ContinuousVestingAccount.Amino | DelayedVestingAccount.Amino | ForeverVestingAccount.Amino | PeriodicVestingAccount.Amino;
    type Data = BaseAccount.Data | BaseVestingAccount.Data | LazyGradedVestingAccount.Data | ContinuousVestingAccount.Data | DelayedVestingAccount.Data | ForeverVestingAccount.Data | PeriodicVestingAccount.Data;
    type Proto = Any;
    function fromAmino(amino: Account.Amino, isClassic?: boolean): Account;
    function fromData(data: Account.Data, isClassic?: boolean): Account;
    function fromProto(accountAny: Account.Proto, isClassic?: boolean): Account;
}
