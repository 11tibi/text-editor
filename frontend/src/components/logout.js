import React from 'react';
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import axios from'axios';
import Button from "@mui/material/Button";

const mapState = state => {
  return {
    authenticated: state.authenticated,
  }
};

const mapDispatch = {logout};

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_ENDPOINT + 'api/logout/',
            data: {token: localStorage.getItem('token')},
        })
        localStorage.removeItem('token');
        this.props.history.push('/login/');
    }

    render() {
        return (
            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
        )
    }
}

export default connect(mapState, mapDispatch)(Logout);