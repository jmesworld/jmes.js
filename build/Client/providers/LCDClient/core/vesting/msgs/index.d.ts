import { MsgCreatePeriodicVestingAccount } from './MsgCreatePeriodicVestingAccount';
import { MsgCreateVestingAccount } from './MsgCreateVestingAccount';
import { MsgDonateAllVestingTokens } from './MsgDonateAllVestingTokens';
export * from './MsgCreatePeriodicVestingAccount';
export * from './MsgCreateVestingAccount';
export * from './MsgDonateAllVestingTokens';
export type VestingMsg = MsgCreatePeriodicVestingAccount | MsgCreateVestingAccount | MsgDonateAllVestingTokens;
export declare namespace VestingMsg {
    type Amino = MsgCreatePeriodicVestingAccount.Amino | MsgCreateVestingAccount.Amino | MsgDonateAllVestingTokens.Amino;
    type Data = MsgCreatePeriodicVestingAccount.Data | MsgCreateVestingAccount.Data | MsgDonateAllVestingTokens.Data;
    type Proto = MsgCreatePeriodicVestingAccount.Proto | MsgCreateVestingAccount.Proto | MsgDonateAllVestingTokens.Proto;
}
