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
        LCDC?: LCDClientConfig,
    }
}
export class Client {
    public providers: {
        marketplaceAPI: MarketplaceAPI,
        identityAPI: IdentityAPI,
        faucetAPI: FaucetAPI,
        LCDC: LCDClient
    };

    constructor(config?: ClientConfig) {
        const lcdcConfig = config?.providers?.LCDC ?? {
            chainID: 'jmes-888',
            URL: 'http://51.38.52.37:1317',
            // Refers to the difference introduced with Phoenix-1 vs Columbus-6
            // on /cosmos/ pathing on MsgInstantiateContract
            isClassic: false,
        };

        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI(config?.providers?.marketplaceAPI),
            identityAPI: new IdentityAPI(config?.providers?.identityAPI),
            faucetAPI: new FaucetAPI(config?.providers?.faucetAPI),
            LCDC: new LCDClient(lcdcConfig)
        }
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
        return new Wallet(chainDerivedKey, this.providers.LCDC);
    }

    public async getSupply(denom: string = "ujmes"){
        const total = await this.providers.LCDC.bank.total();
        return total[0].get(denom);
    }

    public async getValidatorInfo(validatorAddress: string){
        if(!validatorAddress) return null;

        const commission = await this.providers.LCDC.distribution.validatorCommission(validatorAddress)
        const validator = {
            rewards: {
                commission: commission.get('ujmes')
            },
            ...await this.providers.LCDC.staking.validator(validatorAddress)
        };

        return validator;
    }

    public async getValidators(params = {}){
        return this.providers.LCDC.staking.validators(params);
    }
}
