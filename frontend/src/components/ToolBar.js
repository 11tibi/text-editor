import React from 'react';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from "@mui/material/IconButton/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axiosInstance from '../axiosApi';
import {select_theme} from "../actions/text_area";
import {setOutput, setOutputEmpty} from '../actions/code';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CreateDialog from './CreateDialog';

const mapState = state => {
    return {
        authenticated: state.authenticated,
        editor_theme: state.editor_theme,
        themes: state.themes,
        code: state.code,
        output: state.output,
    }
};

const mapDispatch = {select_theme, setOutput, setOutputEmpty};

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClearConsole = this.handleClearConsole.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleChange(e, value) {
        let new_data = {id: value.props.value, name: value.props['data-code']};
        this.props.select_theme(new_data);
    }

    handleRun(event) {
        let data = {
            code: this.props.code.code,
            language: this.props.code.language.judge0_id,
        };
        try {
            axiosInstance.post('api/submit/', data).then(
                (response) => {
                    this.props.setOutput((
                        '\n' + response.data.stdout + response.data.stderr + '\nProcess finished with exit code ' +
                        response.data.exit_code + '\nExecution time ' + response.data.time
                    ));
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    handleCopy(event) {
        navigator.clipboard.writeText(this.props.code.code);
    }

    handleSave(event) {
        let data = {code: this.props.code.code};
        axiosInstance.patch('api/code/' + this.props.match.params.id + '/', data).catch((error) => {
            if (error.response.status === 403) {
                this.setState({dialogOpen: true});
            }
        });
    }

    handleClearConsole(event) {
        this.props.setOutputEmpty();
    }

    handleDownload(event) {
        const element = document.createElement("a");
        const file = new Blob([this.props.code.code], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${this.props.code.title}.${this.props.code.language.extension}`;
        document.body.appendChild(element);
        element.click();
    }

    render() {
        return (
            <Grid container mt={1} spacing={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
                <Grid item xs={12}>
                    <Tooltip title="Run">
                        <IconButton color="primary" aria-label="run" onClick={this.handleRun}>
                            <PlayArrowIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Copy">
                        <IconButton color="primary" aria-label="copy" onClick={this.handleCopy}>
                            <ContentCopyIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Save">
                        <IconButton color="primary" aria-label="save" onClick={this.handleSave}>
                            <SaveIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Clear Output">
                        <IconButton color="primary" aria-label="clear" onClick={this.handleClearConsole}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Download">
                        <IconButton color="primary" aria-label="download" onClick={this.handleDownload}>
                            <DownloadIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>

                <CreateDialog
                    open={this.state.dialogOpen}
                    handleClose={() => this.setState({dialogOpen: false})}
                />
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(ToolBar));
