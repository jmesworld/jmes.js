import {Account} from '../Account'
import {DerivableKey} from '../DerivableKey'
import {LCDClient} from "Client/providers/LCDClient/lcd/LCDClient";
export class Wallet {
    private chainDerivedKey: DerivableKey;
    public lcdcInstance: LCDClient | null;

    constructor(chainDerivedKey: DerivableKey, lcdcInstance?: LCDClient) {
        this.chainDerivedKey = chainDerivedKey;
        this.lcdcInstance = lcdcInstance ?? null;
    }

    getAccount(index:number=0){
        return new Account(this.chainDerivedKey, index, this.lcdcInstance);
    }
};
