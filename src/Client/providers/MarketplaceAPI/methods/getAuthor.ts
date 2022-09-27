import Axios from "axios";

export default async function getAuthor(){
    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.url}/author`;

    return Axios.get(url);
};
