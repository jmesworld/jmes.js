import Axios from 'axios';

export default async function getIdentity(identityName: string){
    console.log('Search for identity name', identityName);

    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.api_url}/identity/${identityName}`;

    return Axios.get(url);
};
