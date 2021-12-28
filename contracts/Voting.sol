//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Allows pausing of voting via pausable 
// Also allows contextual information
// Allows ownership through ownable
contract Voting is Ownable, Pausable  {

    // The default number of voters which is 0
    uint votersCount  = 0;

    mapping(address => Voter) voters;

    // Enum to hold the value of voted or not voted.
    enum Voted{NO, YES}

    // Struct to store information about voters
    struct Voter {
        string name;
        bool response;
        Voted hasVoted;
        bool registered;
    }


    constructor() {}

    modifier NotRegisteredToVote(){
        require(voters[_msgSender()].registered == false, "Voting: You're already registered to vote"); 
        _;
    }
    modifier registeredToVote(){
        require(voters[_msgSender()].registered == true, "Voting: You're not registered to vote" );
        _;
    }

    modifier voteCasted(){
        require(voters[_msgSender()].hasVoted == Voted.YES, "Voting: You haven't casted your vote.");
        _;
    }

    modifier voteNotCasted(){
        require(voters[_msgSender()].hasVoted == Voted.NO, "Voting: You have casted your vote." )
    }

    // Voter can be added to the smart contract (But only when it's not voting time)
    function addVoter(string memory name) external whenPaused NotRegisteredToVote{
        address addressToAdd = _msgSender();
        voters[addressToAdd] = Voter(name, Voted.NO, false, true);
        votersCount++;
    }

    // Only the owner can start the voting session
    function startVote() public onlyOwner {
        //  Unpause using the pausable 
        _unpause();
    }

    function endVote() public onlyOwner {
        // Pause the voting session again using pausable
        _pause();
    }
   
    // Votes can be cast when the voting session is not paused.
    function vote(bool _response) external whenNotPaused registeredToVote voteNotCasted {
        //Update struct values
        Voter storage voter = voters[_msgSender()];
        voter.response = _response; 

    }    
  
    function getNumberOfVoters() public view returns(uint) {
        return votersCount;
    }
}
