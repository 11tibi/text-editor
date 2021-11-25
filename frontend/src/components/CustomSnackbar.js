import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class CustomSnackbar extends React.Component {
    render() {
        return (
            <Snackbar open={this.props.isOpen} autoHideDuration={6000} onClose={this.props.handleClose}>
                <Alert onClose={this.props.handleClose} severity={this.props.type} sx={{width: '100%'}}>
                    {this.props.msg}
                </Alert>
            </Snackbar>
        )
    }
}

export default CustomSnackbar;
