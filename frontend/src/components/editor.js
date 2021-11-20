import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToolBar from './ToolBar';
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
    constructor(props) {
        super(props);
        this.state = {
            projectId: 0,
        }
    }

    componentDidMount() {
        axiosInstance.get('api/theme/').then((response) => {
            this.props.set(response.data);
        });

        axiosInstance.get('api/code/' + this.props.match.params.id + '/').then((response) => {
            this.props.setCode(response.data.code);
            this.props.setTitle(response.data.name);
            this.props.setLanguage(response.data.language);
            this.setState({projectId: response.data.id});
        }).catch((error) => {
            if (error.response.status === 403) {
                this.props.history.push('/dashboard/');
            }
        });
    }

    render() {
        return (
            <Grid container mt={1}>
                <CssBaseline />
                <Grid item xs={1} sm={1} md={1}>
                    <ToolBar />
                </Grid>
                <Grid item xs={11} sm={11} md={6}>
                    <TextArea />
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Output />
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Editor));