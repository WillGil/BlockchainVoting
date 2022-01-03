import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';


const NavBar = (props) => {

    const displayAddressTruncated = function(){
        return props.account.slice(0,5)+"...."+props.account.slice(-5)
    }

    return(
        <div>
        <AppBar position="static">
            <Toolbar>
            <Box display='flex' flexGrow={1}>
            <Typography color="inherit">
                Blockchain Voting
            </Typography>
            </Box>
           {props.account ?`Connected to ${displayAddressTruncated()}` : "Not Connected" } 
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;