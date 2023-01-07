import Axios from "axios";

export default async function createIdentity(username: string, account: any){
    console.log('Create identity with uname', username);
    if(!username) throw new Error('Username required');
    const address = account.getAddress();
    const publicKey = account.getPublic();

    console.log({address, publicKey})
    //@ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.api_url}/identity/${username}`;
    console.log({url});
    // const signature = '123abc';
    // @ts-ignore

    return Axios.post(url, { publicKey: publicKey.toString('hex'), address });
};
