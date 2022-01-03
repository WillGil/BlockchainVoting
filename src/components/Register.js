import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";

const Register= () => {
  const [textValue, setTextValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleSubmit = () => {
    console.log("Register started...");
    
  }
  const handleReset = () => setTextValue("");

  return (
    <Paper>
      <h2>Register here</h2>

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