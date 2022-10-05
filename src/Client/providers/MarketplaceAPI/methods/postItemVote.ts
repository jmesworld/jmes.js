import Axios from "axios";

export interface ItemVoteParams {
    identifier: string,
    userIdentifier: string,
    direction: number,
}

export default async function postItemVote(itemVoteParams: ItemVoteParams){
    // @ts-ignore
    const {endpoint} = this;
    const { identifier, direction, userIdentifier } = itemVoteParams;

    const url = `${endpoint.url}/item/${identifier}/vote`;

    return Axios.post(url, { direction, userIdentifier });
};
