import { useEffect, useState, useRef } from 'react';
import Voting from './Voting'
import NavBar from './components/NavBar'

function App() {

  const [value, setValue] = useState('');
  const [accounts, setAccounts] = useState('');
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const init = async () => {
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

        setAccounts(accounts);
  
      } else{
        console.log("No authorised account found!");
      }

      // Get all the current players 
      const players = await Voting.getRegisteredVoters()
      setPlayers(players);
    };
    init();
  }, []);

  return(
    <NavBar account={accounts}/>

  )

} 

export default App;

