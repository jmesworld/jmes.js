import { Wallet } from '../primitives/Wallet';
import {Mnemonic} from "primitives";
import {APIFactory} from "./API";
import MarketplaceAPI from "./providers/MarketplaceAPI/marketplaceAPI";
import IdentityAPI from "./providers/IdentityAPI/IdentityAPI";

export class Client {
    public api: APIFactory;
    public providers: {
        marketplaceAPI: MarketplaceAPI,
        identityAPI: IdentityAPI,
    };

    constructor() {
        this.api = new APIFactory({
            chainID: 'default',
            URL:''
        });

        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI(),
            identityAPI: new IdentityAPI()
        }
    }

    public createWallet(key: Mnemonic){
        console.log(key);
        return new Wallet();
    }
}
