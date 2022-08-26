import 'mocha';
import { expect } from 'chai';
import {Client, Wallet, Mnemonic} from "../../src";
// import {Account} from "../../src/index";

describe('JMES.js - Functional', function suite() {
    let key: Mnemonic;
    let client: Client;
    let wallet: Wallet;
    it('should create a new key', async function () {
        const mnemonic = 'better junior picnic scorpion weekend pledge alley upgrade security guess tank advance switch home segment trend cousin tomato language indicate flame demise head noble';
        key = new Mnemonic(mnemonic);
        expect(await key.toSeed()).to.equal('35a3979ce1674ddcfba17bcc2e0b6c58486329a53905a2f468b940cecf6b75e7325bd61a793a30fb2bc0f5e5e83c6ab16f065a1ed8bfdfd6fb66117a5accee08');
    });
    it('should create a new client instance', function () {
        client = new Client();
    });
    it('should create a new wallet', function () {
        wallet = client.createWallet(key);
    });
    it('should create a transaction', function () {
        const sendTransactionMessage = { something: true };
        const signedMessage = wallet.signMessage(sendTransactionMessage);
        const broadcastResult = wallet.broadcastSignedMessage(signedMessage);
        console.log(broadcastResult)

    });
});
