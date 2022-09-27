import Axios from "axios";

export default async function getAuthors(){
// @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.url}/authors`;

    return Axios.get(url);
};
