import {DerivableKey} from "../DerivableKey";
import * as elliptic from "elliptic";
import {MsgSend, Coin} from "../../Client/providers/LCDClient/core";
import {RawKey} from "../../Client/providers/LCDClient/key";
import {LCDClient} from "../../Client/providers/LCDClient/lcd/LCDClient";

export class Account {
    private derivableAccountKey: DerivableKey;
    private accountIndex: number;
    private test: any;
    private test2: any;
    private lcdcUrl: string;
    private lcdc: LCDClient|null;
    constructor(key: DerivableKey, accountIndex: number=0, lcdcUrl?: string|null) {

        this.lcdc = null;
        this.lcdcUrl = lcdcUrl ?? 'http://51.38.52.37:1317'
        // this.privateKey = key.derivePath(`m/0/${index}`);
        // this.derivableAccountKey = key;
        this.derivableAccountKey = key.derivePath(`m/${accountIndex}'`);
        // this.test = key.derivePath(`m/${accountIndex}'/0/0`).toAddress();
        // this.test2 = key.derivePath(`m/${accountIndex}'`).derivePath('m/0/0').toAddress();
        this.accountIndex = accountIndex;
    }
    getAddress(index: number=0){
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toAddress();
        // return this.derivableAccountKey.toAddress();
    }
    getPrivate(index: number=0){
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toPrivate();
    }
    getPublic(index: number=0): Buffer {
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toPublic();
    }
    signMessage(message: any, index: number = 0): Buffer {
        const privateKey = this.getPrivate(index);
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(privateKey);
        const sign = key.sign(message.toString()).toDER()

        // @ts-ignore
        return Buffer.from(sign);
    }
    verifySignature(signature: any, message: any, publicKey: any){
        const ec = new elliptic.ec('secp256k1');
        let isValid = false;
        if(!publicKey){
            throw new Error('Expected publicKey');
        }
        // We verify a publicKey
       const pubKey = ec.keyFromPublic(publicKey, 'hex');
       isValid = pubKey.verify(message.toString(), Buffer.from(signature, 'hex'));

       return isValid;
    }
    async getLcdcClient(lcdcUrl?: string){
        const URL = lcdcUrl ?? this.lcdcUrl;
        console.log({URL});
        if(!this.lcdc){
            const lcdc = new LCDClient({
                chainID: 'jmes-testet-1',
                // chainID: 'testing',
                URL,
                isClassic: true
            });
            this.lcdc = lcdc;
        }

        return this.lcdc;
    }

    async getBalance(address?: string){
        const lcdcClient = await this.getLcdcClient();
        try {
            const [balance] = await lcdcClient.bank.balance(address ?? this.getAddress());
            return balance.get('ujmes') || new Coin("ujmes", 0)
        } catch (e){
            console.log(e);
            throw e
        }
    }
    // @ts-ignore
    async sendTransaction(transactionOpts:{recipientAddress: string, recipientAmount:number, memo?: string, fee?: string}, lcdcUrl?: string, chainId?: string): any{
        // create a simple message that moves coin balances
        const send = new MsgSend(
            this.getAddress(),
            transactionOpts.recipientAddress,
    { ujmes: transactionOpts.recipientAmount}
        );
        const txOpts = {msgs: [send]};
        if(transactionOpts.memo){
            //@ts-ignore

            txOpts.memo = transactionOpts.memo;
        }

        const URL = lcdcUrl ?? 'http://64.92.191.45:1317';
        const lcdc = new LCDClient({
            chainID: 'jmes-testnet-1',
            // chainID: 'testing',
            URL,
            isClassic: true,
        });

        console.log("lcdurl: ", URL)
        console.log("chainId: ", chainId)
        // @ts-ignore
        return lcdc.wallet(new RawKey(this.getPrivate()))
            //@ts-ignore
            .createAndSignTx(txOpts)
            //@ts-ignore
            .then(tx => {
                console.log("tx to be broadcasted: ", tx);
                lcdc.tx.broadcast(tx)})
            //@ts-ignore
            .then(result => {
                console.log(`TX hash: ${result.txhash}`);
                return result
            }).catch((e: any)=>{
                console.log(e);
                throw e;
            });
    }
};
