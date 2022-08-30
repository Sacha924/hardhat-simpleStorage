// We want to be able to test all of our solidity code locally, so that we know exactly what it's doing.
//HardHat testing works with the Mocha framework, which is a JavaScript based framework for running our tests
const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  //Our before each function is going to tell us what to do before each of our it
  // So in order to test our smart contracts, before we actually run our tests, we're probably going to need to deploy the smart contracts first.
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it("Shoud start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    //we can use either the assert keyword, or the expect keyword, which we're going to import both of these from a package called Chai.
    assert.equal(currentValue.toString(), expectedValue); // we use .toString() because like the last time the currentValue is a BigNumber object
    //expect(currentValue.toString()).to.equal(expectedValue)
  });
  it("Should update when we call store", async function () {
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue.toString(), "7");
  });
});
