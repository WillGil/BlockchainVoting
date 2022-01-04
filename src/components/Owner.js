import {Button} from '@material-ui/core'; 


  const Owner = function ( props){

    const changeState = async (pausedState) =>{
        const isPaused = getState();

        const votingContract = props.contract;

    
        const changeStateTx = (isPaused) ? (await votingContract.startVote()) : (await votingContract.endVote());

    
        const receipt = await changeStateTx.wait();
        console.log('Transaction receipt', receipt);


        if(receipt.status === 0){
            // TX FAILED
            console.log("Failed to change state.");
        } else{
            //User has voted  re-render page 
            props.setVotingPaused(!isPaused)
            console.log(`Contract is now paused: ${!isPaused}`);
        }
    }



    const getState= function(){
        return props.pausedVoting;
    }

    const resetVotes = async function (){
    
        const votingContract = props.contract;

        const resetTx = await votingContract.resetVotes();

        const receipt = await resetTx.wait();

        console.log('Transaction receipt', receipt);


        if(receipt.status === 0){
            // TX FAILED
            console.log("Failed to reset voters.");
        } else{
            //User has voted  re-render page 
            props.setVotedUsers([])
            console.log(`Users have now been reset.`);
        }



    }

      return(
        <>
        <h4>Owner Panel</h4>
        <Button onClick={changeState}>
              {getState() ? "Unpause" : "Pause"} 
        </Button>
        {(()=>{
            if(getState()){
                return(<Button onClick={resetVotes}>
                    Reset
                </Button>
                )
            }
        })()}
       
        </>

      )
  } 
export default Owner;