//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Allows pausing of voting via pausable
// Also allows contextual information via inheritance
// Allows ownership through ownable
contract Voting is Ownable, Pausable {
    // Solidity generates getters for public variables
    address[] public registeredVoters;
    address[] public voteCasters;

    mapping(address => Voter) voters;

    // Enum to hold the value of voted or not voted.
    enum Response {
        NO,
        YES
    }

    // Struct to store information about voters
    struct Voter {
        string name;
        Response response;
        bool init;
        bool castVote;
    }

    constructor() {
        // pause voting until ready
        _pause();
    }

    modifier NotRegisteredToVote() {
        require(
            voters[_msgSender()].init == false,
            "Voting: You are already registered to vote"
        );
        _;
    }
    modifier registeredToVote() {
        require(
            voters[_msgSender()].init == true,
            "Voting: You are not registered to vote"
        );
        _;
    }

    modifier voteCast() {
        require(
            voters[_msgSender()].castVote == true,
            "Voting: You have not casted your vote."
        );
        _;
    }

    modifier voteNotCast() {
        require(
            voters[_msgSender()].castVote == false,
            "Voting: You have casted your vote."
        );
        _;
    }

    function startVote() external onlyOwner {
        _unpause();
    }

    function endVote() external onlyOwner {
        _pause();
    }

    // Voter can be added to the smart contract (But only when it's not voting time)
    function addVoter(string memory _name)
        external
        whenPaused
        NotRegisteredToVote
    {
        address newVoter = _msgSender();
        voters[newVoter] = Voter(_name, Response.NO, true, false);
        // Add a new voter to the list of registered voters
        registeredVoters.push(newVoter);
    }

    // Votes can be cast when the voting session is not paused.
    function vote(bool _response)
        external
        whenNotPaused
        registeredToVote
        voteNotCast
    {
        address voterAddress = _msgSender();
        //Update struct values
        Voter storage voter = voters[voterAddress];
        voter.response = (_response == true ? Response.YES : Response.NO);
        voteCasters.push(voterAddress);
    }

    function getVotes() public view returns (uint256, uint256) {
        uint256 yesCount = 0;
        uint256 noCount = 0;
        for (uint256 i = 0; i < voteCasters.length; i++) {
            if (voters[voteCasters[i]].response == Response.YES) {
                yesCount++;
            } else {
                noCount++;
            }
        }
        return (noCount, yesCount);
    }

    function getUsers()
        public
        view
        returns (address[] memory, address[] memory)
    {
        return (registeredVoters, voteCasters);
    }
}
