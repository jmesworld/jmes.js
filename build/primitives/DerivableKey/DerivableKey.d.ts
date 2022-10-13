export declare class DerivableKey {
    private privateKey;
    constructor(privateKey: any | null);
    derivePath(path: string): DerivableKey;
    toAddress(): string;
}
