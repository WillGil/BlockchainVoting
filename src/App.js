import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/Voting.json';
import {Button} from '@material-ui/core'; 


//const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = contract.abi;


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);


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

  const connectWalletHandler = () => { }

  const yesVoteHandler = () => { 
    console.log(`${currentAccount} voted yes.`);

    
  }

  const noVoteHandler = () => { 
    console.log(`${currentAccount} voted no.`);

  }

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} >
        Connect Wallet
      </Button>
    )
  }

  const voteYesButton = () => {
    return (
      <Button onClick={yesVoteHandler}>
        Yes
      </Button>
    )
  }

  const voteNoButton =() =>{
    return (
      <Button onClick={noVoteHandler}>
        No
      </Button>
    )
  }
  const loadQuestion = () =>{
    // Chcck blockchain
    try{

      const {ethereum} = window;
    }catch(err){
         console.log(err);
       }
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])
  // Components can be programmatically injected in like below, We could load question from contract (later)
  return (
    <div className='main-app'>
      <div>
        Connected as <i>{currentAccount}</i>
      </div>
      <h1>Blockchain Voting</h1>
      <div>
        <p>is Curtis in bed?</p>
      </div>
      <div>
      {currentAccount ? loadQuestion() : connectWalletButton()}
      </div>
      
    </div>
  )
}

export default App;