//imports
//In the package.json file we have this dependency called Hard Hat ethers. Hard Hat ethers is a package that actually wraps hard hat with its own built in ethers. This is really advantageous because it allows hard hat to keep track of different deployments at different scripts and all these other things for us. So instead of importing ethers directly from ethers, we're actually going to import ethers directly from hard hat instead.
const { ConstructorFragment } = require("@ethersproject/abi");
const { ethers, run, network } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  //to wait to make sure it gets deployed
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  // what happens when we deploy to our hardhat network?
  console.log(network.config);

  //4=> rinkeby chainId; what we do is that we only want to verify if we are on our test net. And w ralso want to make sure we only verify if our ether scan API key exists.
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    // See on etherscan and all these block explorers the instant we deploy the contract and the instant we send the contract, etherscan might not know about the transaction yet, it might take a hot second for ether scan to be up to speed with where the blockchain is. So it's usually best practice to wait for a few blocks to be mined, until you actually run your verification process. We've actually learned how to do this already with the deploy transaction.
    await verify(simpleStorage.address, []);
  }
}

//Since our simple storage doesn't have a constructor, the arguments for simple storage are just gonna be blank. But in the future, when we have contracts that do have constructors, the arguments are going to be populated.
async function verify(contractAdress, args) {
  console.log("Verifying contract...");
  // in our code, we can actually run any task from hard hat using a run package. So we import run from hardhat at the top of the code and then we can do:
  try {
    await run("verify:verify", {
      address: contractAdress.address,
      ConstructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
