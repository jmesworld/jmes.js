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
        return bech32.encode('jmes', bech32.toWords(node.identifier));
    }

}
