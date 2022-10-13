import { Wallet } from '../primitives/Wallet';
import { Mnemonic } from "../primitives/Mnemonic/Mnemonic";
import { DerivableKey } from "../primitives/DerivableKey/DerivableKey";
import MarketplaceAPI from "./providers/MarketplaceAPI/marketplaceAPI";
import IdentityAPI from "./providers/IdentityAPI/IdentityAPI";
export declare class Client {
    providers: {
        marketplaceAPI: MarketplaceAPI;
        identityAPI: IdentityAPI;
    };
    constructor();
    createWallet(key: Mnemonic | DerivableKey): Wallet;
}
