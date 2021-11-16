import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axiosInstance from "../axiosApi";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {withRouter} from 'react-router-dom';

class DeleteCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleDelete(event) {
        axiosInstance.delete(`api/code/${this.props.id}`).then(() => {
            if (this.props.handleUiUpdate !== undefined) {
                this.props.handleUiUpdate();
            }
            if (this.props.redirectTo !== undefined) {
                this.props.history.push(this.props.redirectTo);
            }
        })
        this.setState({isOpen: false});
    }

    handleClose(event) {
        this.setState({isOpen: false});
    }

    render() {
        return (
            <div>
                <IconButton aria-label="delete" color='secondary'>
                    <DeleteIcon onClick={() => this.setState({isOpen: true})}/>
                </IconButton>
                <Dialog open={this.state.isOpen} onClose={this.handleClose}>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to delete this project?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleDelete}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(DeleteCode);
