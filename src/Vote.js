import {ethers} from "ethers"
import votingContract from './contracts/Voting.json';

  // Set required contract information
const contractAddress = "0x6d05547cE44983E6b1c919a729C94188fd65621A";
const abi = votingContract.abi;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


export default new ethers.Contract(contractAddress, abi, signer);      
    



