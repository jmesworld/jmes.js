import {Account} from '../Account'
import {DerivableKey} from '../DerivableKey'
export class Wallet {
    private chainDerivedKey: DerivableKey;
    public lcdcUrl: string | null;

    constructor(chainDerivedKey: DerivableKey, lcdcUrl?: string) {
        this.chainDerivedKey = chainDerivedKey;
        this.lcdcUrl = lcdcUrl ?? null;
    }

    getAccount(index:number=0){
        return new Account(this.chainDerivedKey, index, this.lcdcUrl);
    }

    signMessage(message: any){
        console.log({message});
    }

    broadcastSignedMessage(signedMessage: any){
        console.log({signedMessage});
    }
};
