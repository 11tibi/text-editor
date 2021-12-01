import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axiosInstance from "../axiosApi";
import CustomSnackbar from "./CustomSnackbar";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
            isOpen: false,
            snackbar: {
                open: false,
                msg: '',
                type: '',
            },
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleOpen() {
        this.setState({isOpen: true});
    }

    handleClose() {
        this.setState({isOpen: false});
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handlePasswordChange() {
        let data = {
            old_password: this.state.oldPassword,
            new_password1: this.state.newPassword1,
            new_password2: this.state.newPassword2,
        };
        axiosInstance.patch('api/user/change-password/', data).then((response) => {
            this.setState({
                isOpen: false,
                snackbar: {
                    open: true,
                    msg: 'Password successfully changed',
                    type: 'success',
                },
            });
        }).catch((error) => {
            this.setState({
                isOpen: false,
                snackbar: {
                    open: true,
                    msg: 'Faild to change the password',
                    type: 'error',
                },
            });
        }).finally(() => {
            this.setState({oldPassword: '', newPassword1: '', newPassword2: '',})
        })
    }

    render() {
        return (
            <Grid mt={5} align='center'>
                <Button variant="outlined" color="error" onClick={this.handleOpen}>
                    Change Password
                </Button>
                <Dialog open={this.state.isOpen} onClose={this.handleClose}>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            variant="standard"
                            margin="dense"
                            id="oldPassword"
                            label="Old Password"
                            type="password"
                            value={this.state.oldPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            variant="standard"
                            margin="dense"
                            id="newPassword1"
                            label="New Password 1"
                            type="password"
                            value={this.state.newPassword1}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            variant="standard"
                            margin="dense"
                            id="newPassword2"
                            label="New Password 2"
                            type="password"
                            value={this.state.newPassword2}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handlePasswordChange}>Change</Button>
                    </DialogActions>

                </Dialog>
                <CustomSnackbar
                    isOpen={this.state.snackbar.open}
                    msg={this.state.snackbar.msg}
                    type={this.state.snackbar.type}
                    handleClose={() => this.setState({
                        snackbar: {...this.state.snackbar, open:false}
                    })}
                />
            </Grid>
        )
    }
}

export default ChangePassword;
