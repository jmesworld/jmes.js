import { LCDClient } from './LCDClient';
import { Key } from '../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { Tx } from '../core/Tx';
import { SignMode as SignModeV1 } from '@terra-money/legacy.proto/cosmos/tx/signing/v1beta1/signing';
import { SignMode as SignModeV2 } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
export declare class Wallet {
    lcd: LCDClient;
    key: Key;
    constructor(lcd: LCDClient, key: Key);
    accountNumberAndSequence(): Promise<{
        account_number: number;
        sequence: number;
    }>;
    accountNumber(): Promise<number>;
    sequence(): Promise<number>;
    createTx(options: CreateTxOptions & {
        sequence?: number;
    }): Promise<Tx>;
    createAndSignTx(options: CreateTxOptions & {
        sequence?: number;
        accountNumber?: number;
        signMode?: SignModeV1 | SignModeV2;
    }): Promise<Tx>;
}
