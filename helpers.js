import ethers from 'ethers';

const keccak256 = ethers.utils.keccak256;
const abiCoder = new ethers.utils.AbiCoder;

export function getQueryData(query) {
    const pattern = /(\w+):(\w+)\/(\w+)/;
    if (query.match(pattern) == null) {
        alert(`Wrong query: ${query}\nExample query: SpotPrice:eth/usd`);
        return null;
    }
    const market = query.replace(pattern, '$1');
    const name1 = query.replace(pattern, '$2');
    const name2 = query.replace(pattern, '$3');
    const queryDataArgs = abiCoder.encode(["string", "string"], [name1, name2]);
    const queryData = abiCoder.encode(["string", "bytes"], [market, queryDataArgs]);
    return queryData;
}

export function getQueryId(queryData) {
    return keccak256(queryData);
}

export function encode(value) {
    let fixedValue;

    // Check if the input value is an integer
    if (Number.isInteger(+value)) {
        fixedValue = ethers.utils.parseUnits(value.toString(), 10);
    } else {
        const roundedValue = Number(parseFloat(value.toString()).toFixed(10));
        fixedValue = ethers.utils.parseUnits(roundedValue.toString(), 10);
    }

    const hexValue = fixedValue.toHexString();
    return hexValue;
}

export function decode(bytesVal) {
    const intval = ethers.BigNumber.from(bytesVal);

    // Check if the value is an integer
    if (intval.mod(ethers.constants.WeiPerEther).isZero()) {
        return intval.toNumber();
    } else {
        const formatted = ethers.utils.formatUnits(intval, 10);
        return parseFloat(formatted);
    }
}