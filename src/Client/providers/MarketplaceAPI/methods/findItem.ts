import Axios from "axios";

export default async function findItem(searchParams){
    console.log('Find Item for search', searchParams);

    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.url}/item/${itemIdentifier}`;

    return Axios.get(url);
};
