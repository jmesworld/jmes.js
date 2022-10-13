import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { BIP32Interface } from 'bip32';
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
        const bip32 = BIP32Factory(ecc);
        const node = bip32.fromSeed(Buffer.from(this.privateKey, 'hex'));
        const child = node.derivePath(path);
        // @ts-ignore
        return new DerivableKey(child.privateKey.toString('hex'))
    }
    toAddress(){
        const bip32 = BIP32Factory(ecc);
        const node = bip32.fromSeed(Buffer.from(this.privateKey, 'hex'));
        // @ts-ignore
        const address = bech32.encode('jmes', bech32.toWords(node.identifier));
        // @ts-ignore
        return address;
    }

}
