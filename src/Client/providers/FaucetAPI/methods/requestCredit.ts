import Axios from "axios";

export default async function requestCredit(this: any, address: string){
    console.log('Request credit from', address);
    if(!address) throw new Error('Address required');
    const {endpoint} = this;

    const url = `${endpoint.api_url}/credit?address=${address}&denom=ujmes`;
    console.log(url);
    return Axios.get(url);
};
