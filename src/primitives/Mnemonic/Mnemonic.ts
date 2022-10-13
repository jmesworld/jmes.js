import * as crypto from "crypto";
import { ethers } from "ethers";
import * as bip39 from 'bip39';

export class Mnemonic {
    mnemonic: string;

    // @ts-ignore
    static generateMnemonic(getRandomValuesFn = (crypto && crypto.webcrypto) ? crypto.webcrypto.getRandomValues : crypto.getRandomValues){
        const uintArray = new Uint8Array(32);
        const randomBytes = getRandomValuesFn(uintArray);
        const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
        return mnemonic;
    }
    static mnemonicToSeed(mnemonic: string) {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        return seed.toString('hex');
    }

    constructor(mnemonic?: string) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
    }
    toSeed(){
        return Mnemonic.mnemonicToSeed(this.mnemonic);
    }
};
