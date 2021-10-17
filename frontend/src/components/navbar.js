import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import authenticated from "../reducers/authenticated";
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import Logout from './logout';

const mapState = state => {
  return {
    authenticated: state.authenticated,
  }
};

const mapDispatch = {logout};

class Navbar extends React.Component {

    render() {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Home
                        </Typography>
                        {/*https://github.com/satya164/react-simple-code-editor*/}
                        {/*https://github.com/securingsincity/react-ace*/}
                        { this.props.authenticated === true ? <Logout /> : <Button color="inherit">Login</Button> }
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default connect(mapState, mapDispatch)(Navbar);