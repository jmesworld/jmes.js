import Axios from 'axios';

export default async function getToken(account: any){
    console.log('Get JWT Token for account');

    const ts = +new Date();

    const message = ts.toString();
    const signature = account.signMessage(message).toString('hex');
    const address = account.getAddress();
    // @ts-ignore
    const {endpoint} = this;
    // const { identifier, price } = itemOfferParams;


    const url = `${endpoint.url}/identity/token`;
    console.log({url}, {signature, ts, address});
    // const signature = '123abc';
    // @ts-ignore

    return Axios.post(url, { signature, ts, address });
};
