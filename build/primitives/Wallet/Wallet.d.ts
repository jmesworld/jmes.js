import { Account } from '../Account';
import { DerivableKey } from '../DerivableKey';
import { LCDClient } from "Client/providers/LCDClient/lcd/LCDClient";
export declare class Wallet {
    private chainDerivedKey;
    lcdcInstance: LCDClient | null;
    constructor(chainDerivedKey: DerivableKey, lcdcInstance?: LCDClient);
    getAccount(index?: number): Account;
}
