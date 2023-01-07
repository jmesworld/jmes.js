export interface ItemVoteParams {
    identifier: string;
    direction: number;
}
export default function postItemVote(itemVoteParams: ItemVoteParams, optionalProps: any): Promise<import("axios").AxiosResponse<any, any>>;
