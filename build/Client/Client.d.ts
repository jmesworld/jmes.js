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
}
