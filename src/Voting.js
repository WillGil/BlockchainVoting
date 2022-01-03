import {ethers} from 'ethers';
import votingContract from './contracts/Voting.json';

const address = "0x6d05547cE44983E6b1c919a729C94188fd65621A"
const abi = votingContract.abi;


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(address, abi, signer);     


export default contract;    