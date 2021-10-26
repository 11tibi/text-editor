import React from 'react';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from '@mui/material/FormControl';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from "@mui/material/IconButton/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axiosInstance from '../axiosApi';
import {select_theme} from "../actions/text_area";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const mapState = state => {
    return {
        editor_theme: state.editor_theme,
        themes: state.themes,
        code: state.code,
    }
};

const mapDispatch = {select_theme};

class ToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e, value) {
        let new_data = {id: value.props.value, name: value.props['data-code']};
        this.props.select_theme(new_data);
    }

    handleRun(event) {
        alert('run');
    }

    handleCopy(event) {
        navigator.clipboard.writeText(this.props.code.code);
    }

    render() {
        return (
            <Grid container mt={1} spacing={3}>
                <Grid xs={3} spacing={3}>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <Select
                            value={this.props.editor_theme.id}
                            displayEmpty
                            onChange={this.handleChange}
                        >
                            {this.props.themes.map((themes) => <MenuItem value={themes.id} data-code={themes.link}>{themes.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3} spacing={3}>
                    <span>Run </span>
                    <IconButton color="primary" aria-label="run" onClick={this.handleRun}>
                        <PlayArrowIcon/>
                    </IconButton>
                </Grid>
                <Grid xs={3} spacing={3}>
                    <IconButton color="primary" aria-label="run" onClick={this.handleCopy}>
                        <ContentCopyIcon/>
                    </IconButton>
                </Grid>
                <Grid xs={3} spacing={3}></Grid>
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(ToolBar));
