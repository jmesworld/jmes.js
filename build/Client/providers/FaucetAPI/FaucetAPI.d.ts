import { AxiosResponse } from "axios";
export interface FaucetAPIConfig {
    endpoint?: {
        api_url?: string;
    };
}
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class FaucetAPI {
    requestCredit: (address: string) => Promise<AxiosResponse<any>>;
    private endpoint;
    constructor(config?: FaucetAPIConfig);
}
