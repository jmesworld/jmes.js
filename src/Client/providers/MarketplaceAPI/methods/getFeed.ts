import Axios from "axios";

export default async function getFeed(optionalProps: any){
    console.log('Get feed');

    // @ts-ignore
    const {endpoint} = this;

    const url = `${endpoint.api_url}/feed`;

    let config = {
        headers: {}
    }
    if(optionalProps.token){
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${optionalProps.token}`;
    }
    return Axios.get(url, config);
};
