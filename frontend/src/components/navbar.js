import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import Logout from './logout';

const mapState = state => {
  return {
    authenticated: state.authenticated,
  }
};

const mapDispatch = {logout};

const toolbarStyle = {
    minHeight: '50px',
};

class Navbar extends React.Component {

    render() {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar style={toolbarStyle}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Home
                        </Typography>
                        { this.props.authenticated === true ?
                            <Logout value='Logout' color='inherit'/> :
                            <Button color="inherit" component={Link} to="/login/">Login</Button> }
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default connect(mapState, mapDispatch)(Navbar);