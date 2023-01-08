import { MintItemParams } from "./methods/mintItem";
import { FindItemParams } from "./methods/findItem";
import { ItemOfferParams } from "./methods/postItemOffer";
import { ItemVoteParams } from "./methods/postItemVote";
export interface MarketplaceAPIConfig {
    endpoint?: {
        api_url?: string;
        images_url?: string;
    };
}
/**
 * Marketplace API is a specific provider we provide to our DAO product built on top of JMES Protocol
 */
export default class MarketplaceAPI {
    getAuthor: () => Promise<any>;
    getAuthors: () => Promise<any>;
    getFeed: (props: any) => Promise<any>;
    getItem: (itemIdentifier: string) => Promise<any>;
    getAllItems: () => Promise<any>;
    findItem: (findParams: FindItemParams) => Promise<any>;
    mintItem: (mintParams: MintItemParams) => Promise<any>;
    postItemOffer: (itemOfferParams: ItemOfferParams) => Promise<any>;
    postItemVote: (itemVoteParams: ItemVoteParams, optionalProps: any) => Promise<any>;
    endpoint: {
        api_url: string;
        images_url: string;
    };
    constructor(config?: MarketplaceAPIConfig);
}
