import Axios from 'axios';

export default async function getItem(itemIdentifier: string){
    console.log('Get Item for identity identifier', itemIdentifier);

    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.url}/item/${itemIdentifier}`;

    return Axios.get(url);
};
