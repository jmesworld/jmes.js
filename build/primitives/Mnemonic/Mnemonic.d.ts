export declare class Mnemonic {
    mnemonic: string;
    static generateMnemonic(overwroteRandomBytes?: null): string;
    static mnemonicToSeed(mnemonic: string): string;
    constructor(mnemonic?: string);
    toSeed(): string;
}
