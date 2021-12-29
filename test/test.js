const { expect } = require("chai");
const { ethers } = require("hardhat");

let Voting;
let voting;
let owner;
let addr1;
let addr2;
let addrs;


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


    it("Check no one has casted as vote.", async function () {

      // destructuring assignment
      let [usersRegistered, usersVoted] = await voting.getUsers();

      expect(usersRegistered.length).to.equal(0);
      expect(usersVoted.length).to.equal(0);
    
    });
  })
  describe("Adding users", function () {

    it("Adding users normally.", async function () {
      await voting.addVoter("Test");

      let [usersRegistered, ] = await voting.getUsers();


      expect(usersRegistered.length).to.equal(1)

    });
    it("Adding users when not paused.", async function () {
      const unpause = await voting.startVote();
      const addedUserTx = voting.addVoter("Test");
      await expect(addedUserTx).to.be.revertedWith("Pausable: not paused"); 

    });
    it("Adding user who has already registered once, no double-voting.", async function () {
      const addedUserTx = voting.addVoter("Test");
      const secondUserTx = voting.addVoter("Test2");

      await expect(secondUserTx).to.be.revertedWith("Voting: You are already registered to vote"); 
    });

  });
  describe("Voting", function () {

    it("User can vote.", async function(){

      // Unpause the voting.
      
      const addedUser = await voting.addVoter("Test");
      const voteTx = await voting.vote(true);
    })
  });

});
