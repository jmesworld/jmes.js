import getIdentity from "./methods/getIdentity";
import createIdentity from "./methods/createIdentity";
import {AxiosResponse} from "axios";
/**
 * Identity API is a specific provider that handles identity resolving for JMES Protocol users
 */
export default class IdentityAPI {
    public getIdentity!: (identityName: string) => Promise<AxiosResponse<any>>;
    public createIdentity!: () => Promise<any>;

    private endpoint: { url: string };
    constructor() {

        this.endpoint = {
            url: 'http://localhost:3001'
        }
    }
};

IdentityAPI.prototype.getIdentity = getIdentity;
IdentityAPI.prototype.createIdentity = createIdentity;
