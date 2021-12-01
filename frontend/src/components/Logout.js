import React from 'react';
import {logout} from "../actions/authenticated";
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {withRouter} from "react-router";
import {setUser} from "../actions/user";

const mapState = state => {
    return {
        authenticated: state.authenticated,
        user: state.user
    }
};

const mapDispatch = {logout, setUser};

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.props.setUser({id: 0, email: ''});
        this.props.logout();
        if(this.props.onClick) {
            this.props.onClick();
        }
        this.props.history.push('/login/');
    }

    render() {
        return (
            <Button
                color={this.props.color}
                onClick={() => {this.handleLogout();}}
                disabled={this.props.disabled}
                fullWidth={this.props.fullWidth}
            >
                {this.props.value}
            </Button>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Logout));