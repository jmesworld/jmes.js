import { AxiosResponse } from "axios";
export interface IdentityAPIConfig {
    endpoint?: {
        api_url?: string;
    };
}
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class IdentityAPI {
    getIdentity: (identityName: string) => Promise<AxiosResponse<any>>;
    getToken: (account: any) => Promise<AxiosResponse<any>>;
    createIdentity: (identityName: string, account: any) => Promise<any>;
    private endpoint;
    constructor(config?: IdentityAPIConfig);
}
