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

const balance = account.getBalance();

// Send transaction
const txResponse = await account.sendTransaction({
    recipientAddress: "jmes1g2vaept3rxjvfzyfmem5am5x74n4qygq58jy9v",
    recipientAmount: 172064,
})
```

## Usage on React-Native

While this library will handle secpk1256 generation, upon creating a new Mnemonic, it might causes some issues despite overwritting `crypto` module.  
If so, you can pass specific bytes to the Mnemonic function.   

```js
import 'react-native-get-random-values'
const randomBytes = crypto.getRandomValues(new Uint8Array(32));
const mnemonic = Mnemonic.generateMnemonic(randomBytes);
```
