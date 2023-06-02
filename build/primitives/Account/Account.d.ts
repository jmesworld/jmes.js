/// <reference types="node" />
import { DerivableKey } from "../DerivableKey";
import { Coin } from "../../Client/providers/LCDClient/core";
import { LCDClient } from "../../Client/providers/LCDClient/lcd/LCDClient";
export declare class Account {
    private derivableAccountKey;
    private accountIndex;
    private lcdcInstance;
    constructor(key: DerivableKey, accountIndex?: number, lcdcInstance?: LCDClient | null);
    getAddress(index?: number): string;
    getPrivate(index?: number): Buffer;
    getPublic(index?: number): Buffer;
    signMessage(message: any, index?: number): Buffer;
    verifySignature(signature: any, message: any, publicKey: any): boolean;
    getLCDClient(): LCDClient | null;
    getBalance(address?: string): Promise<Coin>;
    sendTransaction(transactionOpts: {
        recipientAddress: string;
        recipientAmount: number;
        memo?: string;
    }): any;
    withdrawCommission(validator: string): Promise<import("../../Client/providers/LCDClient/lcd/api").WaitTxBroadcastResult | null>;
    /**
     * Allow to withdraw delegator rewards given an address and set of validators
     * @param address
     * @param validators
     * @param type=[delegator|validator]
     */
    withdrawRewards(address: string, validators: [any]): Promise<import("../../Client/providers/LCDClient/lcd/api").WaitTxBroadcastResult | null>;
    delegateTokens(validatorAddress: string, amount: Coin): Promise<import("../../Client/providers/LCDClient/lcd/api").WaitTxBroadcastResult | null>;
    undelegateTokens(validatorAddress: string, amount: Coin): Promise<import("../../Client/providers/LCDClient/lcd/api").WaitTxBroadcastResult | null>;
}
