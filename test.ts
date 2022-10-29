import {Client, Mnemonic} from './src';
import MarketplaceAPI from './src/Client/providers/MarketplaceAPI/MarketplaceAPI';
import IdentityAPI from './src/Client/providers/IdentityAPI/IdentityAPI';
// import path from 'path';
// import fs from 'fs';

(async ()=>{
    const client = new Client();
    const mnemonic = new Mnemonic();
    console.log(mnemonic);
    const wallet = client.createWallet(new Mnemonic('dry liar dose section sniff initial scrap exile blouse security pottery write monkey travel goat friend essence achieve dawn absorb tree hamster core edit'));
    console.log({wallet});
    const account = wallet.getAccount();
    console.log({account});


    //
    // console.log('Receive money at this address:', account.getAddress());
    // const wallet =
    const marketplaceAPI = new MarketplaceAPI();
    const identityAPI = new IdentityAPI();
    // Create identity
    // const createIdentityReq = await identityAPI.createIdentity('dry', account);
    // console.log({createIdentity: createIdentityReq.data});

    // Fetch identity info
    const getIdentityReq = await identityAPI.getIdentity('dry');
    console.log({getIdentity: getIdentityReq.data});


    // Fetch token for identity
    const getIdentityTokenReq = await identityAPI.getToken(account);
    console.log({getIdentity: getIdentityTokenReq.data});
    const token = getIdentityTokenReq.data.token;

    const feed = await marketplaceAPI.getFeed({token});
    console.log({feed});
    const vote = await marketplaceAPI.postItemVote({ identifier: '82f182ddbef3d7b80bafc06ee9e4a664', direction: 1 }, {token});
    console.log({vote});
    // const mintNFT = await marketplaceAPI.mintItem({
    //     author: 'Alex',
    //     title: "Money Maker",
    //     minPrice: "100",
    //     shares: 500,
    //     genre: 'Digital Art',
    //     about: "My art #hashtags",
    //     image: fs.readFileSync(path.join(__dirname,"./tests/moneymaker.png"))
    // });

    // const mintNFT = await marketplaceAPI.mintItem({
    //     author: 'Alex',
    //     title: "Chanel Darth",
    //     minPrice: "100",
    //     shares: 500,
    //     genre: 'Digital Art',
    //     about: "My art #hashtags",
    //     image: fs.readFileSync(path.join(__dirname,"./tests/chaneldarth.png"))
    // });
    // console.log({mintNFT});

    // const getAllNFTs = await marketplaceAPI.getAllItems()
    // console.log(getAllNFTs);

    // const getNFT = await marketplaceAPI.getItem("82f182ddbef3d7b80bafc06ee9e4a664");
    // console.log(getNFT);

    // const feed = await marketplaceAPI.getFeed();
    // console.log({feed});

    // const vote = await marketplaceAPI.postItemVote({ identifier: '82f182ddbef3d7b80bafc06ee9e4a664', userIdentifier: "12345ae", direction: 1 });
    // console.log({vote});
    // const postOffer = await marketplaceAPI.postItemOffer({ identifier: '82f182ddbef3d7b80bafc06ee9e4a664', price: "110" });

   // const identity = await identityAPI.getIdentity('john');
   // console.log({identity});

    //
    // const item = await marketplaceAPI.getItem('john');
    // console.log({item});

   // const feed = await api.getFeed()
   //  console.log({feed});


})()
