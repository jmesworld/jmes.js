// import {Buffer} from "buffer";
// // import Mnemonic from '../Mnemonic/Mnemonic';
//
// export class Account {
//     constructor(mnemonic: string) {
//         this.mnemonic = new Mnemonic(mnemonic);
//     }
//     fetchBalance(){
//
//     }
//     sign(){
//
//     }
//     send(){
//
//     }
// }
//
// // console.log(`Derive from seed`, seed);
// // const derivedSeed = deriveSeed(
// //     seed,
// // walletIndex,
// // 0,
// // 0
// // accountIndex
// // 0
// // derivationPath,
// // );
// // const web3 = new Web3(
// //     new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
// // );
// // // console.log({derivedSeed});
// // // @ts-ignore
// // const rootKey = await bip32.fromSeed(Buffer.from(seed, 'hex'));
// // const derivedKey = rootKey.derivePath('m/0');
// //
// // console.log('DERIVED KEY', derivedKey.toWIF());
// //
// // const account = web3.eth.accounts.privateKeyToAccount(derivedKey.privateKey.toString('hex'));
// // console.log('Derived address:', {address: account.address})
// // const {address, privateKey, encrypt, sign, signTransaction} = account;
// // // @ts-ignore
// // return {accountIndex, walletIndex: 0, address, privateKey, account};
// // // @ts-ignore
// // // web3.eth.getAccounts(console.log);
// //
// // // const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
// //
// // // const acc = new solanaWeb3.Keypair(keyPair);
// // const acc = {
// //     stuff: true
// // }
// // return acc;

import {DerivableKey} from "../DerivableKey";
export class Account {
    private derivableAccountKey: DerivableKey;
    private index: number;
    constructor(key: DerivableKey, index: number) {
        this.derivableAccountKey = key.derivePath(`m/${index}'`);
        this.index = index;
    }
    getAddress(index: number=0){
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toAddress();
    }
    getPrivate(index: number=0){
        return this.derivableAccountKey.derivePath(`m/0/${index}`);
    }
};
