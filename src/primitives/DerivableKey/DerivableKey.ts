const { HDKey } = require("@scure/bip32");

import {bech32} from "bech32";
export class DerivableKey{
    private privateKey: any;

    constructor(privateKey: any|null) {
        this.privateKey = (privateKey !== null) ? privateKey : null;

        if(privateKey){
            this.privateKey = privateKey;
        }
    }

    derivePath(path: string){
        console.log('Derive path', path)
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        const child = node.derive(path);
        return new DerivableKey(Buffer.from(child.privateKey).toString('hex'))
    }
    toAddress(){
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        // Note: Identifier is equals to pubKeyHash. You cannot go back to public key from it.
        return bech32.encode('jmes', bech32.toWords(node.identifier));
    }
    toPrivate(){
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        return Buffer.from(node.privateKey).toString('hex');
    }
    toPublic(){
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        return Buffer.from(node.publicKey).toString('hex');
    }
    sign(message: any){
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        console.log({message})
        return node.sign(message)
    }
    verify(signature: any){
        const node = HDKey.fromMasterSeed(Buffer.from(this.privateKey, 'hex'));
        return node.verify(signature);
    }

}
