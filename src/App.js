import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Vote from './components/Vote'
import provider from './Provider'
import './App.css';
import votingContract from './contracts/Voting.json';
import {ethers} from 'ethers'




function App(){
  // Set the required state
  const [account, setAccount] = useState([]);
  const [question, setQuestion] = useState([]);
  const [registeredUsers, setRegsiteredUsers] = useState([]);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false)
  const [contract, setContract] =useState(undefined)
  const [pausedVoting, setVotingPaused] =useState(undefined)
    
  // When page is rendered we wanna grab the account only 
  useEffect(()=>{
    // We want to load the account, metamask stuff
    const init = async () =>{
      console.log("Rendering");
      const {ethereum} = window;


      if(!ethereum){
        console.log("Make sure you have metamask installed.");
        return;
      } else{
        console.log("Wallet exists, ready to go!");
      }
  
      //Request account from user
      await provider.send("eth_requestAccounts", []);
      // Get user as a signer 
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());
  
      // Set required contract information
      const contractAddress = "0x6d05547cE44983E6b1c919a729C94188fd65621A";
      const abi = votingContract.abi;

      // Get contract for specific signer
      const contract = new ethers.Contract(contractAddress, abi, signer);     

      const question = await contract.question();

      const registeredUsers = await contract.getRegisteredVoters();

  
      const signerAddress = await signer.getAddress();

      const votingPaused = await contract.paused();

      let foundAddress= false;

      // Check to se if user is registered since it's an array we loop
      for(let i=0;i<registeredUsers.length;i++){
          if(registeredUsers[i] === signerAddress){
            // Found value
            foundAddress = true;
          }
      }

      if(foundAddress){
        // User not registered
        setIsRegisteredUser(true);

      } else{
        setIsRegisteredUser(false);
      }


      console.log(isRegisteredUser);

      setRegsiteredUsers(registeredUsers);
      setQuestion(question)
      setAccount(signerAddress);
      setContract(contract);
      setVotingPaused(votingPaused)

      
    }
    init();
  }, [isRegisteredUser])


  return (
    <>
      <NavBar account={account}/>
      <div className='mainbody'>
        <h1>Blockchain Voting</h1>
        <div>
            {question?`QOTD: ${question}`: "Loading..."}
        </div>
        <div>
        {(() => {
          if(isRegisteredUser){
            // Is voting paused?
            if(pausedVoting){
              return(<h3>Voting is paused, please wait...</h3>)
            } else{
              return (<Vote/>);
            }

          } else{
            // Not registered so give register component
            return(<Register setIsRegisteredUser={setIsRegisteredUser} contract={contract}/>)
          }
        })()}
        
        </div>
        <div className='withpre'>
        <h4>Accounts Registered</h4>
        {registeredUsers.length !== 0 ? registeredUsers.join("\n"): "No Users Registered..."}
        </div>
      </div>
    </>
  )
}
export default App;
