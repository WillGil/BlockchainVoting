import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";


const Register= (props) => {
  const [textValue, setTextValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleSubmit = () => {
    console.log("Register started...");
    //Grab the state setter passed in
    props.setIsRegisteredUser(true)
    
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