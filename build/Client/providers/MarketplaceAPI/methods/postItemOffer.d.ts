export interface ItemOfferParams {
    identifier: string;
    price: string;
}
export default function postItemOffer(itemOfferParams: ItemOfferParams): Promise<import("axios").AxiosResponse<any, any>>;
