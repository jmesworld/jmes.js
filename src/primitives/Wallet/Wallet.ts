export class Wallet {
    constructor() {
    }

    signMessage(message: any){
        console.log({message});
    }

    broadcastSignedMessage(signedMessage: any){
        console.log({signedMessage});
    }
};
