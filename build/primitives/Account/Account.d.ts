/// <reference types="node" />
import { DerivableKey } from "../DerivableKey";
import { Coin } from "../../Client/providers/LCDClient/core";
import { LCDClient } from "../../Client/providers/LCDClient/lcd/LCDClient";
export declare class Account {
    private derivableAccountKey;
    private accountIndex;
    private test;
    private test2;
    private lcdcUrl;
    private lcdc;
    constructor(key: DerivableKey, accountIndex?: number, lcdcUrl?: string | null);
    getAddress(index?: number): string;
    getPrivate(index?: number): Buffer;
    getPublic(index?: number): Buffer;
    signMessage(message: any, index?: number): Buffer;
    verifySignature(signature: any, message: any, publicKey: any): boolean;
    getLcdcClient(lcdcUrl?: string): Promise<LCDClient>;
    getBalance(address?: string): Promise<Coin>;
    sendTransaction(transactionOpts: {
        recipientAddress: string;
        recipientAmount: number;
        memo?: string;
        fee?: string;
    }, lcdcUrl?: string, chainId?: string): any;
}
