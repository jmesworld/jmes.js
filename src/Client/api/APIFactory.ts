import {BankAPI} from "Client/api/BankAPI";
import {APIRequester} from "Client/api/APIRequester";

export interface APIConfig {
    /**
     * The base URL to which LCD requests will be made.
     */
    URL: string;

    /**
     * Chain ID of the blockchain to connect to.
     */
    chainID: string;

    /**
     * Coins representing the default gas prices to use for fee estimation.
     */
    gasPrices?: Coins.Input;

    /**
     * Number presenting the default gas adjustment value to use for fee estimation.
     */
    gasAdjustment?: Numeric.Input;

    /**
     * is it connected to forked network?
     */
    isClassic?: boolean;
}

const DEFAULT_LCD_OPTIONS: Partial<LCDClientConfig> = {
    gasAdjustment: 1.75,
};

// isClassic network: true
// forked network : false
const DEFAULT_NETWORK_TYPE_BY_CHAIN_ID: { [key: string]: boolean } = {
    default: false,
    'columbus-5': true,
    'bombay-12': true,
    'pisco-1': false,
};

const DEFAULT_GAS_PRICES_BY_CHAIN_ID: { [key: string]: Coins.Input } = {
    default: {
        uluna: 0.15,
    },
    'columbus-5': {
        uusd: 0.15,
    },
    'bombay-12': {
        uusd: 0.15,
    },
    'pisco-1': {
        uluna: 0.15,
    },
};

export class APIFactory {
    private requester: APIRequester;
    private bank: BankAPI;
    private config: APIConfig;

    constructor(config: APIConfig) {
        this.config = {
            ...DEFAULT_LCD_OPTIONS,
            gasPrices:
                DEFAULT_GAS_PRICES_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_GAS_PRICES_BY_CHAIN_ID['default'],
            isClassic:
                DEFAULT_NETWORK_TYPE_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_NETWORK_TYPE_BY_CHAIN_ID['default'],
            ...config,
        };

        this.requester = new APIRequester(this.config.URL);

        this.bank = new BankAPI(this);
    }
}
