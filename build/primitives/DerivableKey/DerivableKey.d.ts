/// <reference types="node" />
import { HDKey } from '@scure/bip32';
export declare class DerivableKey {
    private privateKey;
    private hdKey;
    constructor(hdKey: HDKey);
    derivePath(path: string): DerivableKey;
    toAddress(): string;
    toPrivate(): Buffer;
    toPublic(): Buffer;
    sign(message: any): Buffer;
    verify(signature: any): any;
}
