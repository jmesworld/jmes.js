import getIdentity from "./methods/getIdentity";
import getToken from "./methods/getToken";
import createIdentity from "./methods/createIdentity";
import {AxiosResponse} from "axios";
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class IdentityAPI {
    public getIdentity!: (identityName: string) => Promise<AxiosResponse<any>>;
    public getToken!: (account: any) => Promise<AxiosResponse<any>>;
    public createIdentity!: (identityName: string, account: any) => Promise<any>;

    private endpoint: { url: string };
    constructor() {

        this.endpoint = {
            url: 'http://51.38.52.37:3001'
        }
    }
};

IdentityAPI.prototype.getIdentity = getIdentity;
IdentityAPI.prototype.getToken = getToken;
IdentityAPI.prototype.createIdentity = createIdentity;
