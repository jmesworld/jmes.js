import {Account} from '../Account'
import {DerivableKey} from '../DerivableKey'
export class Wallet {
    private chainDerivedKey: DerivableKey;

    constructor(chainDerivedKey: DerivableKey) {
        this.chainDerivedKey = chainDerivedKey;
    }

    getAccount(index:number=0){
        return new Account(this.chainDerivedKey, index);
    }

    signMessage(message: any){
        console.log({message});
    }

    broadcastSignedMessage(signedMessage: any){
        console.log({signedMessage});
    }
};
