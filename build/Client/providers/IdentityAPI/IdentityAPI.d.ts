import { AxiosResponse } from "axios";
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class IdentityAPI {
    getIdentity: (identityName: string) => Promise<AxiosResponse<any>>;
    createIdentity: () => Promise<any>;
    private endpoint;
    constructor();
}
