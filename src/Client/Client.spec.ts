import 'mocha';
import { Client } from './Client';
import {expect} from "chai";
import {Wallet} from "../primitives/Wallet";
import {Mnemonic} from "../primitives";

describe('Client', () => {
    let client: Client;
    it('should instantiate', async () => {
        client = new Client();
        expect(client).to.exist;
    });
    it('should create a wallet', function () {
        const mnemonic = new Mnemonic();
        const wallet = client.createWallet(mnemonic);
        expect(wallet).to.exist;
        expect(wallet.constructor).to.equal(Wallet);
    });
});
