import {Account} from '../Account'
import {DerivableKey} from '../DerivableKey'
export class Wallet {
    private chainDerivedKey: DerivableKey;

    constructor(chainDerivedKey: DerivableKey) {
        this.chainDerivedKey = chainDerivedKey;
    }

    // getAccount(privateKey, index:number=0){
    getAccount(index:number=0){
        console.log(`GET ACCOUNT ${index}`)
        return new Account(this.chainDerivedKey, index);
        // this._privateKey = privateKey;
        // return new Account(, index)
    }

    signMessage(message: any){
        console.log({message});
    }

    broadcastSignedMessage(signedMessage: any){
        console.log({signedMessage});
    }
};
