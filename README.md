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

## API

### Client

#### createWallet

Passing either a Mnemonic or a private key, it will generate a Wallet object.

```js
const mnemonic = new Mnemonic();
const client = new Client();
const wallet = client.createWallet(mnemonic);
```

#### getSupply

Allow an optional denom parameter (default: ujmes). Pass bujmes to get the voting rights supply.
```js
const supply = await client.getSupply();
```

### getValidatorInfo

Return a specific validator information.  

```js
const validatorInfo = await client.getValidatorInfo(validatorAddress);
```

### getValidators

Return the list of validators.

```js
const validators = await client.getValidators();
```

### Wallet

#### getAccount

Return an Account object from an optional specified index.  

```js
const account = wallet.getAccount();
```

### Account

#### getAddress

Return the account address on jmesxxxx format.  Allow an optional address index parameter (default: 0).

```js
const address = account.getAddress();
```

#### getBalance

Return the account balance.  Allow an optional address parameter (default .getAddress()).

```js
const balance = account.getBalance();
```

#### getVotingRights

Return the account voting rights.  Allow an optional address parameter (default .getAddress()).

```js
const votingRights = account.getVotingRights();
```

#### sendTransaction

Send a transaction from the account.  

```js
const txResponse = await account.sendTransaction({
    recipientAddress: "jmes1g2vaept3rxjvfzyfmem5am5x74n4qygq58jy9v",
    recipientAmount: 172064,
})
```

#### withdrawCommission

Withdraw the validator commission.  

```js
const txResponse = await account.withdrawCommission(validatorAddress);
```

#### withdrawRewards

Withdraw the delagation rewards for a set of validator.  

```js
const txResponse = await account.withdrawRewards(delegatorAddress, validatorAddresses);
```

#### delegateTokens

Delegate tokens to a validator.  Specified amount is in Coin primitives.

```js
const txResponse = await account.delegateTokens(validatorAddress, amount);
```

#### undelegateTokens

Undelegate tokens from a validator.  Specified amount is in Coin primitives.

```js
const txResponse = await account.undelegateTokens(validatorAddress, amount);
```


##### Coin primitive

A coin primitive is used to represent a specific amount of tokens.

```js
const {Core:{Coin}} = require("jmes.js");
const coin = new Coin(1000000, "ujmes");
```
