import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";


const Register= (props) => {
  const [textValue, setTextValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleSubmit = async () => {
    console.log("Register started...");

    // Add user as a registered user
    const votingContract = props.contract;
    const registerTx =await votingContract.addVoter(textValue)
    
    const receipt = await registerTx.wait();
    console.log('Transaction receipt', receipt);
    
    if(receipt.status === 0){
      // TX FAILED
      console.log("User failed to register");
    } else{
      //User has been registered re-render 
      props.setIsRegisteredUser(true)
      console.log(`Voter added with name ${textValue}`);
    }
    
  }
  const handleReset = () => setTextValue("");

  return (
    <Paper>
      <h4>Register</h4>

      <TextField
        onChange={onTextChange}
        value={textValue}
        label={"Name of Voter..."} //optional
      />

      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Paper>
  );
};

export default Register;