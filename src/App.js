import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Vote from './components/Vote'
import provider from './Provider'
import './App.css';
import votingContract from './contracts/Voting.json';
import {Contract} from 'ethers'
import Owner from './components/Owner'




function App(){
  // Set the required state
  const [account, setAccount] = useState([]);
  const [question, setQuestion] = useState([]);
  const [registeredUsers, setRegsiteredUsers] = useState([]);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [contract, setContract] =useState(undefined);
  const [pausedVoting, setVotingPaused] =useState(true);
  const [isVotedUser, setIsVotedUser] = useState(false);
  const [votedUsers, setVotedUsers] = useState([]);

  const ownerAddress = "0x30Bcf151fd651b1B4E3947dc2741e00a8196170F";
    
  // When page is rendered we wanna grab the account only 
  useEffect(()=>{
    // We want to load the account, metamask stuff
    const init = async () =>{
      const {ethereum} = window;


      if(!ethereum){
        console.log("Make sure you have metamask installed.");
        return;
      } else{
        console.log("Wallet exists, ready to go!");
      }
  
      //Request account from user
      await provider.send("eth_requestAccounts", []);
      
      const { contract, signer } = getContract()   
      
      console.log("Address:",(await signer.getAddress()));

      const question = await contract.question();

    
      const signerAddress = await signer.getAddress();

      const votingPaused = await contract.paused();

     
      setQuestion(question)
      setAccount(signerAddress);
      setContract(contract);
      setVotingPaused(votingPaused)

      
    }
    init();
  }, [])



  useEffect(()=>{
    const init = async function(){

    const { contract, signer } = getContract()    

    const registeredUsers = await contract.getRegisteredVoters();
    const votedUsers  = await contract.getVotedUsers();


    const signerAddress = await signer.getAddress();


    // Check to se if user is registered since it's an array we loop
    let foundAddressRegistered = checkIfContainedInList(registeredUsers, signerAddress)

    if(foundAddressRegistered){
      // User not registered
      setIsRegisteredUser(true);

    } else{
      setIsRegisteredUser(false);
    }

    let foundAddressVoted = checkIfContainedInList(votedUsers, signerAddress);
    
    if(foundAddressVoted){
      setIsVotedUser(true);
    } else{
      setIsVotedUser(false)
    }

   setRegsiteredUsers(registeredUsers);
   setVotedUsers(votedUsers);
   setContract(contract)
  }
  init();
  },[isVotedUser, isRegisteredUser, pausedVoting, votedUsers])


  function getContract() {
    const signer = provider.getSigner()

    // Set required contract information
    const contractAddress = "0x6d05547cE44983E6b1c919a729C94188fd65621A"
    const abi = votingContract.abi

    // Get contract for specific signer
    const contract = new Contract(contractAddress, abi, signer)
    return { contract, signer }
  }


  function checkIfContainedInList(list, expected ) {
    let found = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === expected) {
        // Found value
        found = true
      }
    }
    return found;
  }

  return (
    <>
      <NavBar account={account}/>
      <div className='mainbody'>
        <h1>Blockchain Voting</h1>
        {(()=>{
          // If the user is the owner then we do stuff
          if(account === ownerAddress){
            //Render owner panel
            return(<Owner setVotingPaused={setVotingPaused} pausedVoting={pausedVoting} contract={contract} setVotedUsers={setVotedUsers}/>)
          }

        })()}
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
              return (<Vote setIsVotedUser={setIsVotedUser} contract={contract}/>);
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
        <div className='withpre'>
        <h4>Accounts Voted</h4>
        {votedUsers.length !== 0 ? votedUsers.join("\n"): "No Users Voted..."}
        </div>
      </div>
    </>
  )
}
export default App;


