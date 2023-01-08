/// <reference types="node" />
import { DerivableKey } from "../DerivableKey";
export declare class Mnemonic {
    mnemonic: string;
    private password;
    static generateMnemonic(overwroteRandomBytes?: null): string;
    static mnemonicToSeed(mnemonic: string, password?: string | null): Buffer;
    constructor(mnemonic?: string, password?: string);
    toSeed(): Buffer;
    toMasterDerivableKey(opts?: {
        account: number;
        index: number;
    }): DerivableKey;
}
