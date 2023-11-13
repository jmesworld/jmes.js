
import requestCredit from "./methods/requestCredit";
import {AxiosResponse} from "axios";

export interface FaucetAPIConfig {
    endpoint?:{
        api_url?: string,
    }
}
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class FaucetAPI {
    public requestCredit!: (address: string) => Promise<AxiosResponse<any>>;

    private endpoint: { api_url: string };
    constructor(config?: FaucetAPIConfig) {

        this.endpoint = {
            api_url: config?.endpoint?.api_url ?? 'http://87.98.243.34:3002'
        }
    }
};

FaucetAPI.prototype.requestCredit = requestCredit;
