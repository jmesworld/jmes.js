import * as crypto from "crypto";
import { ethers } from "ethers";
import * as bip39 from 'bip39';

export class Mnemonic {
    mnemonic: string;

    // @ts-ignore
    static generateMnemonic(overwroteRandomBytes = null){
        const getRandomValuesFn = (crypto && crypto.webcrypto)
            // FIX: Binding done to fix specific issue with nodev18 (https://github.com/cloudflare/miniflare/pull/216)
            ? crypto.webcrypto.getRandomValues.bind(crypto.webcrypto)
            : crypto.getRandomValues
        const uintArray = new Uint8Array(32);
        // @ts-ignore
        const randomBytes = (overwroteRandomBytes !== null) ? overwroteRandomBytes : getRandomValuesFn(uintArray);
        // @ts-ignore
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
