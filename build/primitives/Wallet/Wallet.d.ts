import { Account } from '../Account';
import { DerivableKey } from '../DerivableKey';
export declare class Wallet {
    private chainDerivedKey;
    constructor(chainDerivedKey: DerivableKey);
    getAccount(index?: number): Account;
    signMessage(message: any): void;
    broadcastSignedMessage(signedMessage: any): void;
}
