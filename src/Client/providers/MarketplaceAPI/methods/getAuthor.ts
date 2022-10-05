import Axios from "axios";

export default async function getAuthor(){
    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.api_url}/author`;

    return Axios.get(url);
};
