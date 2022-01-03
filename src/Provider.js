import {ethers} from "ethers"

// Set required contract information

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default provider;