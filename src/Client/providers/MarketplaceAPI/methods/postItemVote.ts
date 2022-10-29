import Axios from "axios";

export interface ItemVoteParams {
    identifier: string,
    direction: number,
}

export default async function postItemVote(itemVoteParams: ItemVoteParams, optionalProps: any){
    // @ts-ignore
    const {endpoint} = this;
    const { identifier, direction } = itemVoteParams;

    const url = `${endpoint.api_url}/item/${identifier}/vote`;


    let config = {
        headers: {}
    }
    if(optionalProps.token){
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${optionalProps.token}`;
    }

    return Axios.post(url, { direction }, config);
};
