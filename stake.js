import Web3 from 'web3'
import ethers from 'ethers';
import StakingToken from './abi/StakingToken.json' assert {type: 'json'};
import TellorFlex2 from './abi/TellorFlex2.json' assert {type: 'json'};
import 'dotenv/config';
import {getConfig, validEnvironments} from "./configs.js";

if (process.argv.length < 3) {
    throw new Error('Environment argument not provided. Please specify a chain');
}

const environment = process.argv[2];
const amount = process.argv[3];

if (!validEnvironments.includes(environment)) {
    throw new Error(`Invalid environment: ${environment}. Please specify one of the following: ${validEnvironments.join(', ')}.`);
}

if (!amount || isNaN(Number(amount))) {
    throw new Error('Invalid or missing amount. Please provide a valid number.');
}

const config = getConfig(environment);
const nodeUrl = config.nodeUrl
const privateKey = config.privateKey
const stakingTokenAddress = config.stakingTokenAddress;
const tellorAddress = config.tellorAddress;

const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const tellor = new ethers.Contract(tellorAddress, TellorFlex2.abi, wallet);
const token = new ethers.Contract(stakingTokenAddress, StakingToken.abi, wallet);

async function main() {
    await approve(amount, tellorAddress);
    await depositStake(amount)

    console.log("Successfully Staked amount")
}


async function depositStake(amount) {
    const _amount = Web3.utils.toWei(amount, 'ether');
    const methodArgs = `depositStake(${amount})`;
    try {
        const result = await tellor['depositStake(uint256)'](_amount);
        console.log(methodArgs)
        console.log("tx:", result['hash'])
    } catch (e) {
        console.log(e);
    }
}

async function approve(amount, address) {
    const approveAmountWei = Web3.utils.toWei(amount, 'ether');
    const methodArgs = `approve(${address}, ${amount})`;
    try {
        const result = await token['approve(address,uint256)'](address, approveAmountWei);
        console.log(methodArgs)
        console.log("tx:", result['hash'])
    } catch (e) {
        console.log(e);
    }
}

main()