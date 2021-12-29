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
    enum Response{NO, YES}


    // Struct to store information about voters
    struct Voter {
        string name;
        Response response;
        Response hasVoted;
        Response registered;
    }


    constructor() {
        // pause voting until ready
        _pause();
    }

    modifier NotRegisteredToVote(){
        require(voters[_msgSender()].registered == Response.NO, "Voting: You are already registered to vote"); 
        _;
    }
    modifier registeredToVote(){
        require(voters[_msgSender()].registered == Response.YES, "Voting: You are not registered to vote" );
        _;
    }

    modifier voteCast(){
        require(voters[_msgSender()].hasVoted == Response.YES, "Voting: You have not casted your vote.");
        _;
    }

    modifier voteNotCast(){
        require(voters[_msgSender()].hasVoted == Response.NO, "Voting: You have casted your vote." );
        _;
    }

    function startVote() external onlyOwner{
        _unpause();
    }

    function endVote() external onlyOwner{
        _pause();
    }
    // Voter can be added to the smart contract (But only when it's not voting time)
    function addVoter(string memory name) external whenPaused NotRegisteredToVote{
        address addressToAdd = _msgSender();
        voters[addressToAdd] = Voter(name, Response.NO, Response.NO, Response.YES);
        votersCount++;
    }


    // Votes can be cast when the voting session is not paused.
    function vote(bool _response) external whenNotPaused registeredToVote voteNotCast {
        //Update struct values
        Voter storage voter = voters[_msgSender()];
        voter.response = (_response == true ? Response.YES : Response.NO ); 

    }    
  
    function getNumberOfVoters() public view returns(uint) {
        return votersCount;
    }
}
