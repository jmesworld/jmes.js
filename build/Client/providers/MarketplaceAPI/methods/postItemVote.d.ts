export interface ItemVoteParams {
    identifier: string;
    userIdentifier: string;
    direction: number;
}
export default function postItemVote(itemVoteParams: ItemVoteParams): Promise<import("axios").AxiosResponse<any, any>>;
