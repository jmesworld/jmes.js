import Axios from "axios";
const FormData = require('form-data');

export interface ItemOfferParams {
    identifier: string,
    price: string,
}

export default async function postItemOffer(itemOfferParams: ItemOfferParams){
    // @ts-ignore
    const {endpoint} = this;
    const { identifier, price } = itemOfferParams;

    const url = `${endpoint.api_url}/item/${identifier}/offer`;

    return Axios.post(url, { price });
};
