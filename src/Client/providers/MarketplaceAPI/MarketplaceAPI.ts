import getFeed from "./methods/getFeed";
import getAuthor from "./methods/getAuthor";
import getAuthors from "./methods/getAuthors";
import getAllItems from "./methods/getAllItems";
import getItem from "./methods/getItem";
import {default as mintItem, MintItemParams} from "./methods/mintItem";
import {default as findItem, FindItemParams} from "./methods/findItem";
import {default as postItemOffer, ItemOfferParams} from "./methods/postItemOffer";
import {default as postItemVote, ItemVoteParams} from "./methods/postItemVote";

export interface MarketplaceAPIConfig {
    endpoint?:{
        api_url?: string,
        images_url?: string
    }
}
/**
 * Marketplace API is a specific provider we provide to our DAO product built on top of JMES Protocol
 */
export default class MarketplaceAPI {
    public getAuthor!: () => Promise<any>;
    public getAuthors!: () => Promise<any>;
    public getFeed!: (props: any) => Promise<any>;
    public getItem!: (itemIdentifier: string) => Promise<any>;
    public getAllItems!: () => Promise<any>;
    public findItem!: (findParams: FindItemParams) => Promise<any>;
    public mintItem!: (mintParams: MintItemParams) => Promise<any>;
    public postItemOffer!: (itemOfferParams: ItemOfferParams) => Promise<any>;
    public postItemVote!: (itemVoteParams: ItemVoteParams, optionalProps: any) => Promise<any>;
    // TODO: make me private later
    public endpoint: { api_url: string, images_url: string };
    constructor(config?: MarketplaceAPIConfig) {
        this.endpoint = {
            api_url: config?.endpoint?.api_url ?? 'http://87.98.243.34:3001',
            images_url: config?.endpoint?.images_url ?? 'http://87.98.243.34:3001/images'
        }
    }
};

MarketplaceAPI.prototype.getAuthor = getAuthor;
MarketplaceAPI.prototype.getAuthors = getAuthors;
MarketplaceAPI.prototype.getFeed = getFeed;
MarketplaceAPI.prototype.getItem = getItem;
MarketplaceAPI.prototype.getAllItems = getAllItems;
MarketplaceAPI.prototype.findItem = findItem;
MarketplaceAPI.prototype.postItemOffer = postItemOffer;
MarketplaceAPI.prototype.postItemVote = postItemVote;
MarketplaceAPI.prototype.mintItem = mintItem;
