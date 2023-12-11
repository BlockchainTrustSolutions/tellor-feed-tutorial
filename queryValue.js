import ethers from 'ethers';
import TellorFlex2 from './abi/TellorFlex2.json' assert {type: 'json'};
import {getQueryData, getQueryId, decode} from './helpers.js';
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

const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const tellor = new ethers.Contract(tellorAddress, TellorFlex2.abi, wallet);


const query = "SpotPrice:btc/usd"


main()

async function main() {
    await getCurrentValue(query)
}

async function getCurrentValue(query) {
    const queryData = getQueryData(query);
    if (queryData != null) {
        const queryId = getQueryId(queryData);
        const methodArgs = `getCurrentValue(${query})`;
        try {
            const result = await tellor['getCurrentValue(bytes32)'](queryId);
            const value = decode(result);
            console.log(methodArgs, '', value.toString());
        } catch (e) {
            console.log(e)
            console.log(methodArgs, '', '', true);
        }
    }
}