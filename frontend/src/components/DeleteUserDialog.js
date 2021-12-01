import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@material-ui/icons/Close';
import axiosInstance from "../axiosApi";
import Logout from './Logout';

class DeleteUserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmation: true,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTextValidation = this.handleTextValidation.bind(this);
    }

    handleTextValidation(event) {
        if (event.target.value === 'confirm') {
            this.setState({confirmation: false});
        } else {
            this.setState({confirmation: true});
        }
    }

    handleDelete(event) {
        axiosInstance.delete('api/user/delete/');
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleClose}>
                    <DialogTitle>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1} >Delete Account</Box>
                            <Box>
                                <CloseIcon onClick={this.props.handleClose}/>
                            </Box>
                        </Box>

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography>
                                Are you absolutely sure? This action cannot be undone. This will permanently delete your account.
                            </Typography>
                            <Typography mt={2}>
                                Pleas type <Box component="span" sx={{ color: 'error.main' }}>confirm</Box> to delete.
                            </Typography>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="validation"
                            label=""
                            type="text"
                            fullWidth
                            onChange={this.handleTextValidation}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Logout
                            fullWidth={true}
                            onClick={this.handleDelete}
                            color="error"
                            disabled={this.state.confirmation}
                            value='Delete'
                        />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default DeleteUserDialog;
