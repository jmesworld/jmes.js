export declare class Mnemonic {
    mnemonic: string;
    static generateMnemonic(getRandomValuesFn?: <T extends Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array>(typedArray: T) => T): string;
    static mnemonicToSeed(mnemonic: string): string;
    constructor(mnemonic?: string);
    toSeed(): string;
}
