const dotenv = require('dotenv');
const path = require('path');
const bscscan = require('@skyraptor/bsc-scan').default;
const token = require('@skyraptor/bsc-scan').token;

/* Load the configuration */
dotenv.config({
    path: path.resolve(process.cwd() + '/.env'),
});

async function getWalletBalance(wallet, block = null) {
    try {
        if (block) {
            return await token.getHistoricAccountBalanceForTokenContractAddress(wallet, '0xd37c1417da7bf5b02ffdea8d5427022dc88a0ee2', block);
        } else {
            return await token.getAccountBalanceForTokenContractAddress(wallet, '0xd37c1417da7bf5b02ffdea8d5427022dc88a0ee2');
        }
    } catch (err) {
        console.log(err)
    }

    return null;
}

const run = async () => {
    const wallet = '0xc097046b82fc26ae6a0058BaF0Fe9fE10b750384';

    // https://bscscan.com/myapikey
    bscscan.setApiKey(process.env.BSCSCAN_API_TOKEN)

    const balance = await getWalletBalance(wallet);

    console.log(`Account '${wallet}' has ${balance}LLT.`);
}

run();