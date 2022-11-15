import { Wallet } from '../primitives/Wallet';
import {Mnemonic} from "../primitives/Mnemonic/Mnemonic";
import {DerivableKey} from "../primitives/DerivableKey/DerivableKey";
import MarketplaceAPI from "./providers/MarketplaceAPI/marketplaceAPI";
import IdentityAPI from "./providers/IdentityAPI/IdentityAPI";
import {LCDClient, LCDClientConfig} from "./providers/LCDClient/lcd/LCDClient";
import { JMES_COIN_TYPE } from "../CONSTANTS";
export class Client {
    public providers: {
        marketplaceAPI: MarketplaceAPI,
        identityAPI: IdentityAPI,
        LCDC: LCDClient|null,
    };
    private test: any;

    constructor() {
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI(),
            identityAPI: new IdentityAPI(),
            LCDC: null
        }
    }

    public createLDCDClient(config: LCDClientConfig){
        this.providers.LCDC = new LCDClient(config);
        return this.providers.LCDC;

    }
    public createWallet(key: Mnemonic|DerivableKey){
        // Where 8888 is specific JMES Path for mainnet.
        // jmes-888 in testnet
        const bip44Path = `m/44'/${JMES_COIN_TYPE}'`;

        console.log(`Generating a new wallet with key on BIP Path ${bip44Path}`);

        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        let derivableKey = (key.toMasterDerivableKey) ? key.toMasterDerivableKey() : key;

        // @ts-ignore
        const chainDerivedKey = derivableKey.derivePath(bip44Path);
        return  new Wallet(chainDerivedKey);
    }
}
