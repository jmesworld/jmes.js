import {DerivableKey} from "../DerivableKey";
import * as elliptic from "elliptic";
import {
    MsgSend,
    Coin,
    MsgWithdrawDelegatorReward,
    MsgWithdrawValidatorCommission, Fee, Coins, MsgDelegate, MsgUndelegate
} from "../../Client/providers/LCDClient/core";
import {RawKey} from "../../Client/providers/LCDClient/key";
import {LCDClient} from "../../Client/providers/LCDClient/lcd/LCDClient";

export class Account {
    private derivableAccountKey: DerivableKey;
    private accountIndex: number;
    private lcdcInstance: LCDClient|null;
    constructor(key: DerivableKey, accountIndex: number = 0, lcdcInstance?: LCDClient|null) {
        this.lcdcInstance = lcdcInstance ?? null;
        this.derivableAccountKey = key.derivePath(`m/${accountIndex}'`);
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
    getLCDClient(){
        return this.lcdcInstance;
    }

    async getBalance(address?: string){
        const lcdClient = this.getLCDClient();
        if (!lcdClient) throw new Error('LCDClient not initialized');
        try {
            const balanceAddress = address ?? this.getAddress();
            const [balance] = await lcdClient.bank.balance(balanceAddress);
            return balance.get('ujmes') || new Coin("ujmes", 0)
        } catch (e){
            console.log(e);
            throw e
        }
    }

    async getVotingRights(address?: string){
        const lcdClient = this.getLCDClient();
        if (!lcdClient) throw new Error('LCDClient not initialized');
        try {
            const balanceAddress = address ?? this.getAddress();
            const [balance] = await lcdClient.bank.balance(balanceAddress);
            return balance.get('bujmes') || new Coin("bujmes", 0)
        } catch (e){
            console.log(e);
            throw e
        }
    }
    // @ts-ignore
    async sendTransaction(transactionOpts:{recipientAddress: string, recipientAmount:number, memo?: string}): any{
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

        // const URL = lcdcUrl ?? 'http://87.98.243.34:1317';
        const lcdClient = await this.getLCDClient();

        // @ts-ignore
        return lcdClient.wallet(new RawKey(this.getPrivate()))
            //@ts-ignore
            .createAndSignTx(txOpts)
            //@ts-ignore
            .then(tx => lcdClient.tx.broadcast(tx))
            //@ts-ignore
            .then(result => {
                console.log(`TX hash: ${result.txhash}`);
                return result
            }).catch((e: any)=>{
                // console.log(e);
                throw e;
            });
    }

    async withdrawCommission(validator: string) {
        const lcdClient = await this.getLCDClient();
        if (!lcdClient) return null;

        const fee = new Fee(0, new Coins({ujmes: 0}));

        const msg = new MsgWithdrawValidatorCommission(validator);
        const wallet = lcdClient.wallet(new RawKey(this.getPrivate()))

        const signedTx = await wallet
            //@ts-ignore
            .createAndSignTx({msgs: [msg]}, fee)

        return lcdClient.tx.broadcast(signedTx)
    }

    /**
     * Allow to withdraw delegator rewards given an address and set of validators
     * @param address
     * @param validators
     * @param type=[delegator|validator]
     */
    async withdrawRewards(address: string, validators: [any]) {
        const lcdClient = await this.getLCDClient();
        if (!lcdClient) return null;

        const msgs = [];
        for (let validator of validators) {
            let msg = new MsgWithdrawDelegatorReward(address, validator);
            msgs.push(msg);
        }
        const wallet = lcdClient.wallet(new RawKey(this.getPrivate()))

        const signedTx = await wallet
            .createAndSignTx({msgs})

        return lcdClient.tx.broadcast(signedTx)
    }
    async delegateTokens(validatorAddress: string, amount: Coin){
        const lcdClient = await this.getLCDClient();
        if (!lcdClient) return null;

        let msg = new MsgDelegate(this.getAddress(), validatorAddress, amount);
        const msgs = [msg];

        const wallet = lcdClient.wallet(new RawKey(this.getPrivate()))

        const signedTx = await wallet
            .createAndSignTx({msgs})

        return lcdClient.tx.broadcast(signedTx)
    }
    async undelegateTokens(validatorAddress: string, amount: Coin){
        const lcdClient = await this.getLCDClient();
        if (!lcdClient) return null;

        let msg = new MsgUndelegate(this.getAddress(), validatorAddress, amount);
        const msgs = [msg];

        const wallet = lcdClient.wallet(new RawKey(this.getPrivate()))

        const signedTx = await wallet
            .createAndSignTx({msgs})

        return lcdClient.tx.broadcast(signedTx)
    }
};
