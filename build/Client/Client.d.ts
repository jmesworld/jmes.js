import { Wallet } from '../primitives/Wallet';
import { Mnemonic } from "../primitives/Mnemonic/Mnemonic";
import { DerivableKey } from "../primitives/DerivableKey/DerivableKey";
import MarketplaceAPI, { MarketplaceAPIConfig } from "./providers/MarketplaceAPI/MarketplaceAPI";
import IdentityAPI, { IdentityAPIConfig } from "./providers/IdentityAPI/IdentityAPI";
import FaucetAPI, { FaucetAPIConfig } from "./providers/FaucetAPI/FaucetAPI";
import { LCDClient, LCDClientConfig } from "./providers/LCDClient/lcd/LCDClient";
export interface ClientConfig {
    providers?: {
        marketplaceAPI?: MarketplaceAPIConfig;
        identityAPI?: IdentityAPIConfig;
        faucetAPI?: FaucetAPIConfig;
        LCDC?: LCDClientConfig;
    };
}
export declare class Client {
    providers: {
        marketplaceAPI: MarketplaceAPI;
        identityAPI: IdentityAPI;
        faucetAPI: FaucetAPI;
        LCDC: LCDClient;
    };
    constructor(config?: ClientConfig);
    createWallet(key: Mnemonic | DerivableKey): Wallet;
    getSupply(denom?: string): Promise<import("./providers/LCDClient/core").Coin | undefined>;
    getValidatorInfo(validatorAddress: string): Promise<{
        operator_address: string;
        consensus_pubkey: import("./providers/LCDClient/core").ValConsPublicKey;
        jailed: boolean;
        status: import("@terra-money/terra.proto/cosmos/staking/v1beta1/staking").BondStatus;
        tokens: import("./providers/LCDClient/core").Int;
        delegator_shares: import("./providers/LCDClient/core").Dec;
        description: import("./providers/LCDClient/core").Validator.Description;
        unbonding_height: number;
        unbonding_time: Date;
        commission: import("./providers/LCDClient/core").Validator.Commission;
        min_self_delegation: import("./providers/LCDClient/core").Int;
        rewards: {
            commission: import("./providers/LCDClient/core").Coin | undefined;
        };
    } | null>;
    getValidators(params?: {}): Promise<[import("./providers/LCDClient/core").Validator[], import("./providers/LCDClient/lcd/APIRequester").Pagination]>;
}
