import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import axiosInstance from "../axiosApi";

const mapState = state => {
    return {
        code: state.code,
        user: state.user,
    }
};

const mapDispatch = {};

class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(event) {
        this.props.handleClose();
        let data = {
            user: this.props.user.id,
            language: this.props.code.language.id,
            public: true,
            code: this.props.code.code,
            name: this.props.code.title,
        };
        axiosInstance.post('api/code/', data).then((response) => {
            this.props.history.push('/editor/' + response.data.id);
            alert(response.data.id);
        });
    }

    render() {
        return (
            <div>
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle>Create</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to clone this code?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>Cancel</Button>
                    <Button onClick={this.handleSave}>Yes</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(CreateDialog));
