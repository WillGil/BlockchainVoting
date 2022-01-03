import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Form from './components/Form'
import './App.css';
import {ethers } from 'ethers'
import votingContract from './contracts/Voting.json';



function App(){
  // Set the required state
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentRegisteredUsers, setCurrentRegisteredUsers] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  

  // Set required contract information
  const contractAddress = "0x6d05547cE44983E6b1c919a729C94188fd65621A";
  const abi = votingContract.abi;


  // When page is rendered we wanna grab the account
  useEffect(()=>{
    // We want to load the account, metamask stuff
    checkWalletIsConnected();

    // Get all the registered users 
    getRegisteredUsers();

  }, [])


  const getRegisteredUsers = async () => {
    const {ethereum} = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);     
      
      const registeredUsers = await contract.getRegisteredVoters();

      setCurrentRegisteredUsers(registeredUsers);
    }
  }

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

    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log(`Found an account ${account}`);
      // Set account state
      setCurrentAccount(account);

    } else{
      console.log("No authorised account found!");
    }
  
  }

  const isUserApproved = function(){
    const {ethereum} = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if(currentRegisteredUsers[signer.getAddress()] === undefined){
        return false;
      }
      return true;
    }
  }

  return (
    <>
      <NavBar account={currentAccount}/>
      <div className='mainbody'>

        {isUserApproved() ? console.log("Approved") : <Form/>}
      </div>
    </>
  )
}
export default App;