import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import Logout from './Logout';
import CreateProject from "./CreateProject";
import Theme from './Theme';
import Dashboard from './Dashboard';

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
            <Box>
                <AppBar position="static" color='navbar'>
                    <Toolbar style={toolbarStyle}>
                        <Box display='flex' flexGrow={1}>
                            <Box mx={3}>
                                <Typography variant="h6" component="div">
                                    Home
                                </Typography>
                            </Box>
                            {this.props.authenticated === true ? (
                                <>
                                    <Box mx={5}>
                                        <CreateProject />
                                    </Box>
                                    <Box mx={1}>
                                        <Button color="inherit" component={Link} to="/dashboard/">Dashboard</Button>
                                    </Box>
                                </>
                            ): null}
                        </Box>
                        <Theme/>
                        { this.props.authenticated === true ?
                            <Logout value='Logout' color='inherit' />:
                            <Button color="inherit" component={Link} to="/login/">Login</Button> }
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default connect(mapState, mapDispatch)(Navbar);