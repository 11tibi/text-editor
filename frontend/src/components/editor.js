import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextArea from './text_area';
import Output from './output';
import axiosInstance from "../axiosApi";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {set} from '../actions/editor';
import {setCode, setLanguage, setTitle} from "../actions/code";

const mapState = state => {
    return {
        themes: state.themes,
        code: state.code,
    }
};

const mapDispatch = {set, setCode, setTitle, setLanguage};

class Editor extends React.Component {

    componentDidMount() {
        axiosInstance.get('api/theme/').then((response) => {
            this.props.set(response.data);
        });

        axiosInstance.get('api/code/' + this.props.match.params.id + '/').then((response) => {
            this.props.setCode(response.data.code);
            this.props.setTitle(response.data.name);
            this.props.setLanguage(response.data.language);
        }).catch((error) => {
            if (error.response.status === 403) {
                this.props.history.push('/dashboard/');
            }
        });
    }

    render() {
        return (
            <Grid container spacing={2} mt={0}>
                <CssBaseline/>
                <Grid item xs={1} sm={1} md={1}>
                    <Box sx={{bgcolor: '#45215f', height: '100vh'}}/>

                </Grid>
                <Grid item xs={11} sm={11} md={6}>
                    {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}

                    <TextArea/>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    {/*<Box sx={{ bgcolor: '#ce4513', height: '100vh' }} />*/}

                    <Output/>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Editor));