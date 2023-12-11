import ethers from 'ethers';
import axios from 'axios';
import TellorFlex2 from './abi/TellorFlex2.json' assert {type: 'json'};
import { getQueryData, getQueryId, encode } from './helpers.js';
import 'dotenv/config';
import {getConfig, validEnvironments} from "./configs.js";

if (process.argv.length < 3) {
    throw new Error('Environment argument not provided. Please specify a chain');
}

const environment = process.argv[2];

if (!validEnvironments.includes(environment)) {
    throw new Error(`Invalid environment: ${environment}. Please specify one of the following: ${validEnvironments.join(', ')}.`);
}

const config = getConfig(environment);
const nodeUrl = config.nodeUrl
const privateKey = config.privateKey
const tellorAddress = config.tellorAddress;
const coingecko_endpoint = process.env.COINGECKO_ENDPOINT

const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const tellor = new ethers.Contract(tellorAddress, TellorFlex2.abi, wallet);


const query = "SpotPrice:btc/usd"

main()

async function main() {
    const price = await queryCoinGecko('bitcoin', 'usd')
    await submitValue(query, price)
}

async function queryCoinGecko(ids,currency) {
    try {
        const response = await axios.get(coingecko_endpoint, {
            params: {
                ids: ids,
                vs_currencies: currency
            },
        });

        return response.data[ids][currency]
    } catch (error) {
        console.error('Error querying CoinGecko:', error.message);
        return null;
    }
}

async function submitValue(query, value) {
    const queryData = getQueryData(query);
    if (queryData != null) {
        const queryId = getQueryId(queryData);
        const _value = encode(value);
        const methodArgs = `submitValue(${query})`;
        try {
            const result = await tellor['submitValue(bytes32,bytes,uint256,bytes)'](queryId, _value, 0, queryData);
            console.log(methodArgs, '', value.toString());
        } catch (e) {
            console.log(e)
        }
    }
}

