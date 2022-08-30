require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

require("./tasks/block-number");
require("hardhat-gas-reporter");

//Now sometimes when we're working with our code, if we don't have these environment variables specified Hardhead might get a little bit upset with us. So oftentimes, we add some code in here. So that these variables are always populated, because we didn't specify our rinkeby rpc URL,it's going to be undefined.

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby";
const PRIVATED_KEY = process.env.PRIVATED_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: { url: RINKEBY_RPC_URL, accounts: [PRIVATED_KEY], chaindId: 4 },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    //accounts : we actually don't need to give it accounts. Because when we run with this localhost hardhat will automatically give us these 10 fake accounts for us.
    chaindId: 31337,
  },
  gasReporter: {
    enabled: false, //turn it to true when we want to use it
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY, //this is going to do is actually going to make an API call to corn market cap, whenever we run our gas reporter.
    token: "MATIC",
  },
};
