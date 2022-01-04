import {Button} from '@material-ui/core'; 


  const Vote = function ( props){

    const voteHandler = async (response) =>{
      console.log(`Voted ${response}.`);
      const votingContract = props.contract;

      const votingTx = await votingContract.vote(response)
  
      const receipt = await votingTx.wait();
      console.log('Transaction receipt', receipt);


      if(receipt.status === 0){
        // TX FAILED
        console.log("User failed to vote.");
      } else{
        //User has voted  re-render page 
        props.setIsVotedUser(true)
        console.log(`User voted with resp: ${response}`);
      }
    }

    const yesVoteHandler = async () => { 
       await voteHandler(true);
    }
    
    const noVoteHandler = async () => { 
        await voteHandler(false);
    }

      return(
        <>
        <h4>Now it's time to vote...</h4><Button onClick={yesVoteHandler}>
              Yes
          </Button><Button onClick={noVoteHandler}>
                  No
              </Button></>

      )
  } 

  export default Vote;