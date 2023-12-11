# Tellor Example Simple Data Feed


This is a simple example that should showcase how to add data to Tellor. For more complex scenarios refer to [telliot](https://github.com/tellor-io/telliot-feeds) 

## Setup 

### Install

```npm install```

### .env file

Open the .env file and add the required variables:

- PRIVATE_KEY


### Stake TRB (STRB, HTRB)

To run this you need Tellor Tokens you can stake for your specified chain. Make sure you have enough tokens to be able to be a reporter.

Run:

````npm run tellor:stake [NETWORK] [AMOUNT]````

For example:

````npm run tellor:stake SWISSDLT_MAINNET 100````


## Submit Data

Run:

````npm run tellor:submitValue [NETWORK]````

For example:

````npm run tellor:submitValue SWISSDLT_MAINNET````

You can find all the available chains in config.js or just add your own. Per default this will query coingecko and add a BTC/USD spot price.

## Query Data

Run:

````npm run tellor:getLatestValue [NETWORK]````

For example:

````npm run tellor:getLatestValue SWISSDLT_MAINNET````