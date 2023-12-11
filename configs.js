const configs = {
    SWISSDLT_MAINNET: {
        nodeUrl: process.env.NODE_URL_SWISSDLT_MAINNET || '',
        privateKey: process.env.PRIVATE_KEY_SWISSDLT_MAINNET || '',
        tellorAddress: process.env.TELLOR_ADDRESS_SWISSDLT_MAINNET || '',
        stakingTokenAddress: process.env.STAKING_TOKEN_ADDRESS_SWISSDLT_MAINNET || '',
    },
    HEDERA_MAINNET: {
        nodeUrl: process.env.NODE_URL_HEDERA_MAINNET || '',
        privateKey: process.env.PRIVATE_KEY_HEDERA_MAINNET || '',
        tellorAddress: process.env.TELLOR_ADDRESS_HEDERA_MAINNET || '',
        stakingTokenAddress: process.env.STAKING_TOKEN_ADDRESS_HEDERA_MAINNET || '',
    },
    HEDERA_TESTNET: {
        nodeUrl: process.env.NODE_URL_HEDERA_TESTNET || '',
        privateKey: process.env.PRIVATE_KEY_HEDERA_TESTNET || '',
        tellorAddress: process.env.TELLOR_ADDRESS_HEDERA_TESTNET || '',
        stakingTokenAddress: process.env.STAKING_TOKEN_ADDRESS_HEDERA_TESTNET || '',
    },
};

export const getConfig = (environment) => {
    return configs[environment] || configs['HEDERA_TESTNET'];
};

export const validEnvironments = Object.keys(configs);