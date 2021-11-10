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
import PrivacySwitch from './privacySwitch';



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
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

    render() {

        return (
            <Box sx={{flexGrow: 1}} mt={5}>
                <CssBaseline/>
                <Grid container spacing={2}>
                    <Grid item xs={3}>

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
                                                onChange={(event) => {this.handlePrivacyChange(event, object.id)}}
                                            />
                                        }
                                        label=''
                                    />
                                </Grid>
                                <Grid item xs={4} alignItems="center">
                                    <Typography variant="h6" align='left'>
                                        <Link underline="none" color='#001e3c' component={RouterLink} to={'/editor/' + object.id}>
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
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Dashboard;
