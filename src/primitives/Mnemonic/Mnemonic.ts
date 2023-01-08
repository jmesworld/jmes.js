import * as crypto from "crypto";
import { ethers } from "ethers";
import * as bip39 from 'bip39';
import {DerivableKey} from "../DerivableKey";
import * as bip32 from "@scure/bip32";
import { JMES_COIN_TYPE } from "../../CONSTANTS";

export class Mnemonic {
    mnemonic: string;

    // @ts-ignore
    private password: string | null;
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

    static mnemonicToSeed(mnemonic: string, password?: string | null) {
        return (password) ? bip39.mnemonicToSeedSync(mnemonic, password) : bip39.mnemonicToSeedSync(mnemonic);
    }

    constructor(mnemonic?: string, password?: string) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
        // FIXME: that's bad. Only valid for dev times...
        this.password = password ?? null;
    }
    toSeed(){
        return Mnemonic.mnemonicToSeed(this.mnemonic, this.password);
    }
    // @ts-ignore
    toMasterDerivableKey(opts = { account: 0, index: 0}){
        const seed: Buffer = this.toSeed()
        const masterKey = bip32.HDKey.fromMasterSeed(seed);
        return new DerivableKey(masterKey)
    }
};
