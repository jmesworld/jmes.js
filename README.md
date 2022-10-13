# jmes.js

Javascript developer library to interact with JMES Network


## Install

### ES5/ES6 via NPM

In order to use this library, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed:   

```sh
npm install jmes
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg :

```
<script src="https://unpkg.com/jmes"></script>
```

## Some considerations 

We define a Wallet as a primitives that is initiated from a root private key   
A Wallet can be derived into multiple Account (that have individual public/private key pair).    

## Client

```js
import { Client, Mnemonic } from 'jmes.js'
const client = new Client();
const mnemonic = new Mnemonic();

// Initiate a wallet from a specific mnemonic or private key
const wallet = client.createWallet(mnemonic);
// Each wallet allow to generate multiple account, by default, it will be index 0. 
const account = wallet.getAccount();

// Get an account's Address on jmesxxxx format.  
const address = account.getAddress();

// Sign and broadcast a transaction
const signedMessage = wallet.signMessage({});
const txid = wallet.broadcastSignedMessage(signedMessage);

// Get feed
const feed = client.providers.marketplaceAPI.getFeed();
const item = client.providers.marketplaceAPI.getItem(itemIdentifier);
const author = client.providers.marketplaceAPI.getAuthor(item.author);
```

- `account.getFeed()` - Returns an array of items (nft,...)

- `account.getAuthor({nickname})`
- `account.getAuthors()`
- `account.getUser({nickname})`

- `account.mintItem(item)` - Allow to create a new item of type NFT.
- `account.getItem({id})` - Allow to get a specific item
- `account.findItem({syntax})`

## Items

Items images can be found at {SERVER_URI}/images/{item.filename}. eg: `http://localhost:3001/images/82f182ddbef3d7b80bafc06ee9e4a664.png`   
SERVER_URL is specified in MarketplaceAPI.endpoint.images_url.  
Where filename is md5.
