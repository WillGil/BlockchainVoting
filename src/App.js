import { useEffect, useState, useRef } from 'react';
import './App.css';
import contract from './contracts/Voting.json';
import {Button} from '@material-ui/core'; 
import {ethers } from 'ethers'



const contractAddress = "0x85AAB37161be03dB138dFEd914421Fc8Fa80d507";
const abi = contract.abi;


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const checkWalletIsConnected = async () => { 
    const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure you have metamask installed.");
      return;
    } else{
      console.log("Wallet exists, ready to go!");
    }

    //Request account from user
    const accounts = await ethereum.request({method:"eth_requestAccounts"});

    if(accounts.length !== 0){
      const account = accounts[0];
      console.log(`Found an account ${account}`);
      // Set account state
      setCurrentAccount(account);

    } else{
      console.log("No authorised account found!");
    }
  
  }

  const getQuestion = async() => {
    const {ethereum} = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress,abi, signer);

      // Now get the question attached 
      const question = await votingContract.getQuestion();

      setCurrentQuestion(question);
    }

   }

   const getIfUserHasRegistered = async ()=>{
    const {ethereum} = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress,abi, signer);
      

      const address = await signer.getAddress();
      const getVoters =  await votingContract.registeredVoters().then(resp =>{
        console.log(getVoters);
      })      
   }
  }

  // const connectWalletHandler = () => { }

  // const yesVoteHandler = () => { 
  //   console.log(`${currentAccount} voted yes.`);

    
  // }

  // const noVoteHandler = () => { 
  //   console.log(`${currentAccount} voted no.`);

  // }

  // const connectWalletButton = () => {
  //   return (
  //     <Button onClick={connectWalletHandler} >
  //       Connect Wallet
  //     </Button>
  //   )
  // }

  // const voteYesButton = () => {
  //   return (
  //     <Button onClick={yesVoteHandler}>
  //       Yes
  //     </Button>
  //   )
  // }

  // const voteNoButton =() =>{
  //   return (
  //     <Button onClick={noVoteHandler}>
  //       No
  //     </Button>
  //   )
  // }

  useEffect(() => {
    checkWalletIsConnected();
    getQuestion();
    getIfUserHasRegistered();
  }, [])


  // Components can be programmatically injected in like below, We could load question from contract (later)
  return (
    <div className='main-app'>
      <div>
        <p>Connected as <i>{currentAccount}</i></p>
      </div>
      <h1>Blockchain Voting</h1>
      <div>
          {currentQuestion? currentQuestion: "Loading..."}
      </div>
      <div>

      </div>
    </div>
  )
}

export default App;
