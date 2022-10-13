import { Wallet } from '../primitives/Wallet';
import {Mnemonic} from "../primitives/Mnemonic/Mnemonic";
import {DerivableKey} from "../primitives/DerivableKey/DerivableKey";
import MarketplaceAPI from "./providers/MarketplaceAPI/marketplaceAPI";
import IdentityAPI from "./providers/IdentityAPI/IdentityAPI";

export class Client {
    public providers: {
        marketplaceAPI: MarketplaceAPI,
        identityAPI: IdentityAPI,
    };

    constructor() {
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI(),
            identityAPI: new IdentityAPI()
        }
    }

    public createWallet(key: Mnemonic|DerivableKey){
        // Where 8888 is specific JMES Path for mainnet.
        const bip44Path = `m/44'/330'`;

        console.log(`Generating a new wallet with key on BIP Path ${bip44Path}`);

        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        let derivableKey = (key.toSeed) ? new DerivableKey(key.toSeed()) : key;

        // @ts-ignore
        const chainDerivedKey = derivableKey.derivePath(bip44Path);
        return  new Wallet(chainDerivedKey);
    }
}
