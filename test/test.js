const { expect } = require("chai");
const { ethers } = require("hardhat");


let Voting;
let voting;

describe("Voting", function(){
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    voting = await Voting.deploy();
  });

  describe("Setup", function () {


    it("Check no one has casted as vote ", async function () {
    
      // Check there are no users who have cast their vote 
      expect((await voting.getNumberOfVoters())).to.equal(0)
    });
  })

});
