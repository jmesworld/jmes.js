import { Account } from '../Account';
import { DerivableKey } from '../DerivableKey';
export declare class Wallet {
    private chainDerivedKey;
    lcdcUrl: string | null;
    constructor(chainDerivedKey: DerivableKey, lcdcUrl?: string);
    getAccount(index?: number): Account;
    signMessage(message: any): void;
    broadcastSignedMessage(signedMessage: any): void;
}
