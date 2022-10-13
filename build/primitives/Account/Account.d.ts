import { DerivableKey } from "../DerivableKey";
export declare class Account {
    private derivableAccountKey;
    private index;
    constructor(key: DerivableKey, index: number);
    getAddress(index?: number): string;
}
