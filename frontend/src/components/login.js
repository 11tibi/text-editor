import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/authenticated'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography'
import Container from '@mui/material/Container';
import axiosInstance from "../axiosApi";

const mapState = state => {
  return {
    authenticated: state.authenticated,
  }
};

const mapDispatch = {login};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const loginAction = this.props;
        const { history: { push } } = this.props;
        try{
            axiosInstance.post('api/token/', {
                email: data.get('email'),
                password: data.get('password'),
            }).then(function (response) {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                loginAction.login();
                push('/dashboard/');
                return response.data;
            })
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="Keep me logged in"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/register/' variant="body2">
                                    Don't have an account? Create one here!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        )
    }
}

export default connect(mapState, mapDispatch)(Login);
