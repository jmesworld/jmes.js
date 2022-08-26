import * as crypto from "crypto";
import { ethers } from "ethers";
import * as bip39 from 'bip39';

export class Mnemonic {
    mnemonic: string;

    static generateMnemonic(){
        // @ts-ignore
        const getRandomValuesFn = (crypto && crypto.webcrypto) ? crypto.webcrypto.getRandomValues : crypto.getRandomValues;

        const randomBytes = getRandomValuesFn(new Uint8Array(32));
        const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
        return mnemonic;
    }
    static async mnemonicToSeed(mnemonic: string) {
        const seed = await bip39.mnemonicToSeedSync(mnemonic);
        return seed.toString('hex');
    }

    constructor(mnemonic?: string) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
    }
    toSeed(){
        return Mnemonic.mnemonicToSeed(this.mnemonic);
    }
};
