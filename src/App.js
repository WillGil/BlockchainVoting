import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Vote from './Vote'
import './App.css';
import {ethers } from 'ethers'
import votingContract from './contracts/Voting.json';



function App(){
  // Set the required state
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]); 
  const [question, setQuestion] = useState([]);
  const [registeredUsers, setRegsiteredUsers] = useState([]);


  // When page is rendered we wanna grab the account only 
  useEffect(()=>{
    // We want to load the account, metamask stuff
    const init = async () =>{
      const {ethereum} = window;
      const abi = votingContract.abi;
      const contractAddress = "0x6d05547cE44983E6b1c919a729C94188fd65621A";


      if(!ethereum){
        console.log("Make sure you have metamask installed.");
        return;
      } else{
        console.log("Wallet exists, ready to go!");
      }
  
      //Request account from user
      const accounts = await ethereum.request({method:"eth_requestAccounts"});
  
      if(accounts.length !== 0) {
        console.log(`Found accounts ${accounts}`);

        // Get Contract
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer); 
        
        const question = await contract.question();

        const registeredUsers = await contract.getRegisteredVoters();
 

        setRegsiteredUsers(registeredUsers);
        setQuestion(question)
        setAccounts(accounts);
        setContract(contract)
  
      } else{
        console.log("No authorised account found!");
      }
    }
    init();
  }, [])




  return (
    <>
      <NavBar account={accounts[0]}/>
      <div className='mainbody'>
        <h1>Blockchain Voting</h1>
        <div>
            {question?`QOTD: ${question}`: "Loading..."}
        </div>
        <div>
        <h4>Registered</h4>
        {registeredUsers.length !== 0 ? registeredUsers: "No Users Registered..."}
        </div>
      </div>
    </>
  )
}
export default App;
