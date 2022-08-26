# jmes.js

Javascript developer library to interact with JMES Network


## Client

```js
import { Client, Mnemonic } from 'jmes.js'
const client = new Client();
const mnemonic = new Mnemonic();

// Initiate a wallet from a specific mnemonic or private key
const wallet = client.createWallet(mnemonic);

// Sign and broadcast a transaction
const signedMessage = wallet.signMessage({});
const txid = wallet.broadcastSignedMessage(signedMessage);
```
