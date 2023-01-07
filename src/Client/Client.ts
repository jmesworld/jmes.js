import { Wallet } from '../primitives/Wallet';
import {Mnemonic} from "../primitives/Mnemonic/Mnemonic";
import {DerivableKey} from "../primitives/DerivableKey/DerivableKey";
import MarketplaceAPI, {MarketplaceAPIConfig} from "./providers/MarketplaceAPI/MarketplaceAPI";
import IdentityAPI, {IdentityAPIConfig} from "./providers/IdentityAPI/IdentityAPI";
import FaucetAPI, {FaucetAPIConfig} from "./providers/FaucetAPI/FaucetAPI";
import {LCDClient, LCDClientConfig} from "./providers/LCDClient/lcd/LCDClient";
import { JMES_COIN_TYPE } from "../CONSTANTS";

export interface ClientConfig {
    providers?:{
        marketplaceAPI?: MarketplaceAPIConfig,
        identityAPI?: IdentityAPIConfig,
        faucetAPI?: FaucetAPIConfig,
    }
}
export class Client {
    public providers: {
        marketplaceAPI: MarketplaceAPI,
        identityAPI: IdentityAPI,
        faucetAPI: FaucetAPI,
        LCDC: LCDClient|null,
    };
    private test: any;

    constructor(config?: ClientConfig) {
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI(config?.providers?.marketplaceAPI),
            identityAPI: new IdentityAPI(config?.providers?.identityAPI),
            faucetAPI: new FaucetAPI(config?.providers?.faucetAPI),
            LCDC: null
        }
    }

    public createLCDClient(config: LCDClientConfig){
        this.providers.LCDC = new LCDClient(config);
        return this.providers.LCDC;

    }
    public createWallet(key: Mnemonic|DerivableKey, lcdcUrl?: string){
        // Where 8888 is specific JMES Path for mainnet.
        // jmes-888 in testnet
        const bip44Path = `m/44'/${JMES_COIN_TYPE}'`;

        console.log(`Generating a new wallet with key on BIP Path ${bip44Path}`);

        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        let derivableKey = (key.toMasterDerivableKey) ? key.toMasterDerivableKey() : key;

        // @ts-ignore
        const chainDerivedKey = derivableKey.derivePath(bip44Path);
        return  new Wallet(chainDerivedKey, lcdcUrl);
    }
}
