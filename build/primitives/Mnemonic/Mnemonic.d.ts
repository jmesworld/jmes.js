/// <reference types="node" />
import { DerivableKey } from "../DerivableKey";
export declare class Mnemonic {
    mnemonic: string;
    static generateMnemonic(overwroteRandomBytes?: null): string;
    static mnemonicToSeed(mnemonic: string): Buffer;
    constructor(mnemonic?: string);
    toSeed(): Buffer;
    toMasterDerivableKey(opts?: {
        account: number;
        index: number;
    }): DerivableKey;
}
