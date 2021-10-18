import React from 'react';
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";

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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.props.logout();
        this.props.history.push('/login/');
    }

    render() {
        return (
            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Logout));