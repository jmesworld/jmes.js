import { Wallet } from '../primitives/Wallet';
import {Mnemonic} from "primitives";
import {APIFactory} from "./API";

export class Client {
    public api: APIFactory;

    constructor() {
        this.api = new APIFactory();
    }

    public createWallet(key: Mnemonic){
        console.log(key);
        return new Wallet();
    }
}
