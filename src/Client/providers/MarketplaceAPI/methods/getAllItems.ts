import Axios from 'axios';

export default async function getAllItems(){
    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.api_url}/items`;

    return Axios.get(url);
};
