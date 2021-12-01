import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Link as RouterLink} from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import axiosInstance from "../axiosApi";
import PrivacySwitch from './PrivacySwitch';
import {connect} from "react-redux";
import DeleteUserDialog from "./DeleteUserDialog";
import DeleteCode from "./DeleteCode";
import ChangePassword from "./ChangePassword";
import ProfileImage from './ProfileImage';
import {setImage} from "../actions/user";

const mapState = state => {
    return {
        user: state.user,
    }
};

const mapDispatch = {setImage};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            deleteDialogOpen: false,
        };
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
        this.handleUpdateProjects = this.handleUpdateProjects.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    componentDidMount() {
        axiosInstance.get('api/user/code/').then((response) => {
            this.setState({
                ...this.state,
                projects: response.data,
            });
        });
    }

    handlePrivacyChange(event, pk) {
        let data = {
            public: event.target.checked,
        };
        axiosInstance.patch('api/code/' + pk + '/', data);
    }

    handleUpdateProjects(id) {
        var newProjects = this.state.projects;
        for (let i=0; i<newProjects.length; i++) {
            if (newProjects[i].id === id) {
                newProjects.splice(i, 1);
                this.setState({projects: newProjects});
                break;
            }
        }
    }

    handleImageUpload(event) {
        if (event.target.value !== '') {
            let data = new FormData();
            data.append('image', event.target.files[0]);
            axiosInstance.patch('api/user/image/', data).then((response) => {
                this.props.setImage(response.data.image);
            });
        }
    }

    render() {

        return (
            <Box sx={{flexGrow: 1}} mt={5}>
                <CssBaseline/>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <input
                            accept="image/*"
                            className='img-upload'
                            id="contained-button-file"
                            type="file"
                            style={{
                                display: "none",
                            }}
                            onChange={this.handleImageUpload}
                        />
                        <label htmlFor="contained-button-file">
                            <ProfileImage id={this.props.user.id}/>
                        </label>
                        <Typography mt={2} variant='h5' color='#001e3c' align='center'>
                            {this.props.user.email}
                        </Typography>
                        <Grid mt={5} align='center'>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    this.setState({deleteDialogOpen: true})
                                }}>
                                Delete account
                            </Button>
                        </Grid>
                        <ChangePassword/>
                    </Grid>
                    <Grid item xs={9} rowSpacing={2}>
                        {this.state.projects.map(object =>
                            <Grid container xs={12}>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        control={
                                            <PrivacySwitch
                                                sx={{m: 1}}
                                                defaultChecked={object.public}
                                                onChange={(event) => {
                                                    this.handlePrivacyChange(event, object.id)
                                                }}
                                            />
                                        }
                                        label=''
                                    />
                                </Grid>
                                <Grid item xs={3} alignItems="center">
                                    <Typography variant="h6" align='left'>
                                        <Link underline="none" color='#001e3c' component={RouterLink}
                                              to={'/editor/' + object.id}>
                                            {object.name}
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    {object.language.name}
                                </Grid>
                                <Grid item xs={3}>
                                    {new Date(object.updated_at).toISOString().split('T')[0]}
                                </Grid>
                                <Grid item xs={1}>
                                    <DeleteCode
                                        id={object.id}
                                        projects={this.state.projects}
                                        handleUiUpdate={() => {
                                            this.handleUpdateProjects(object.id)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <DeleteUserDialog
                    open={this.state.deleteDialogOpen}
                    handleClose={() => this.setState({deleteDialogOpen: false})}
                />
            </Box>
        )
    }
}

export default connect(mapState, mapDispatch)(Dashboard);
