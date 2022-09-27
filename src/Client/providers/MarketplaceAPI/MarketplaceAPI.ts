import getFeed from "./methods/getFeed";
import getAuthor from "./methods/getAuthor";
import getAuthors from "./methods/getAuthors";
import getItem from "./methods/getItem";
import mintItem from "./methods/mintItem";
import findItem from "./methods/findItem";
/**
 * Marketplace API is a specific provider we provide to our DAO product built on top of JMES Protocol
 */
export default class MarketplaceAPI {
    public getAuthor!: () => Promise<any>;
    public getAuthors!: () => Promise<any>;
    public getFeed!: () => Promise<any>;
    public getItem!: (itemIdentifier: string) => Promise<any>;
    public findItem!: () => Promise<any>;
    public mintItem!: () => Promise<any>;
    private endpoint: { url: string };
    constructor() {

        this.endpoint = {
            url: 'http://localhost:3001'
        }
    }
};

MarketplaceAPI.prototype.getAuthor = getAuthor;
MarketplaceAPI.prototype.getAuthors = getAuthors;
MarketplaceAPI.prototype.getFeed = getFeed;
MarketplaceAPI.prototype.getItem = getItem;
MarketplaceAPI.prototype.findItem = findItem;
MarketplaceAPI.prototype.mintItem = mintItem;
