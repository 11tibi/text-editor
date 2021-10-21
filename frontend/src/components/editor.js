import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import TextArea from './text_area';
import Output from './output';
import axiosInstance from "../axiosApi";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {set} from '../actions/editor';

const mapState = state => {
  return {
    themes: state.themes,
  }
};

const mapDispatch = {set};

class Editor extends React.Component {

    componentDidMount() {
        axiosInstance.get('api/theme/').then((response) => {
            this.props.set(response.data);
        });
    }

    render() {
        return (
            <Grid container spacing={2} mt={0}>
                <CssBaseline/>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <TextArea />
                </Grid>
                <Grid item xs={5}>
                    <Output />
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Editor));