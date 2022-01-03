import {Button} from '@material-ui/core'; 


  const Vote = function ( props){

    const yesVoteHandler = () => { 
        console.log(`${props.currentAccount} voted yes.`);
    }
    
    const noVoteHandler = () => { 
        console.log(`${props.currentAccount} voted no.`);
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