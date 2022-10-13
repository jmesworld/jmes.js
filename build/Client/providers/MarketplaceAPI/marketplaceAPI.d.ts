import { MintItemParams } from "./methods/mintItem";
import { FindItemParams } from "./methods/findItem";
import { ItemOfferParams } from "./methods/postItemOffer";
import { ItemVoteParams } from "./methods/postItemVote";
/**
 * Marketplace API is a specific provider we provide to our DAO product built on top of JMES Protocol
 */
export default class MarketplaceAPI {
    getAuthor: () => Promise<any>;
    getAuthors: () => Promise<any>;
    getFeed: () => Promise<any>;
    getItem: (itemIdentifier: string) => Promise<any>;
    getAllItems: () => Promise<any>;
    findItem: (findParams: FindItemParams) => Promise<any>;
    mintItem: (mintParams: MintItemParams) => Promise<any>;
    postItemOffer: (itemOfferParams: ItemOfferParams) => Promise<any>;
    postItemVote: (itemVoteParams: ItemVoteParams) => Promise<any>;
    private endpoint;
    constructor();
}
