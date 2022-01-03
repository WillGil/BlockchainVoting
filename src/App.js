import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Vote from './components/Vote'
import votingProviderContract from './Contract'
import './App.css';



function App(){
  // Set the required state
  const [account, setAccount] = useState([]);
  const [question, setQuestion] = useState([]);
  const [registeredUsers, setRegsiteredUsers] = useState([]);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false)


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
      const accounts = await ethereum.request({method:"eth_requestAccounts"});
  
      if(accounts.length !== 0) {
        console.log(`Found accounts ${accounts}`);

     
        const question = await votingProviderContract.question();

        const registeredUsers = await votingProviderContract.getRegisteredVoters();

        // CHeck to se if user is registered
        if(registeredUsers[accounts[0]] === undefined){
          // User not registered
          setIsRegisteredUser(false);

        } else{
          setIsRegisteredUser(true);
        }

 
        console.log(isRegisteredUser);

        setRegsiteredUsers(registeredUsers);
        setQuestion(question)
        setAccount(accounts[0]);
  
      } else{
        console.log("No authorised account found!");
      }

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
        <h4>Interact</h4>
        {isRegisteredUser ? <Vote/>: <Register account={account} setIsRegisteredUser={setIsRegisteredUser}/>}


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
