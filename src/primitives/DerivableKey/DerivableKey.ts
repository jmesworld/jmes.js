import { sha256, ripemd160 } from '../../Client/providers/LCDClient/util/hash';

import {bech32} from "bech32";
import { HDKey } from '@scure/bip32';
import * as elliptic from "elliptic";

export class DerivableKey {
    private privateKey: Buffer;
    private hdKey: any;

    // @ts-ignore
    constructor(hdKey: HDKey) {
        //@ts-ignore
        const buffPrivKey = Buffer.from(hdKey.privateKey);
        this.privateKey = buffPrivKey;
        this.hdKey = hdKey;
    }

    derivePath(path: string){
        const derivedHD = this.hdKey.derive(path);
        return new DerivableKey(derivedHD)
    }
    toAddress(){
        const hash = ripemd160(sha256(this.toPublic()));
        return bech32.encode('jmes', bech32.toWords(hash));
    }
    toPrivate(){
        return this.privateKey;
    }
    toPublic(): Buffer {
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(this.toPrivate());
        const publicKey = key.getPublic(true,'hex');
        return Buffer.from(publicKey,'hex');
    }
    sign(message: any): Buffer {
        return this.hdKey.sign(message)
    }
    verify(signature: any){
        return this.hdKey.verify(signature);
    }

}
