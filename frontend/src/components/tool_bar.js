import React from 'react';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from '@mui/material/FormControl';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from "@mui/material/IconButton/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axiosInstance from '../axiosApi';
import {select_theme} from "../actions/text_area";
import {setOutput} from '../actions/code';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CreateDialog from './create_dialog';

const mapState = state => {
    return {
        authenticated: state.authenticated,
        editor_theme: state.editor_theme,
        themes: state.themes,
        code: state.code,
        output: state.output,
    }
};

const mapDispatch = {select_theme, setOutput};

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
    }

    handleChange(e, value) {
        let new_data = {id: value.props.value, name: value.props['data-code']};
        this.props.select_theme(new_data);
    }

    handleRun(event) {
        let data = {
            code: this.props.code.code,
            language: this.props.code.language_id,
        };
        try {
            axiosInstance.post('api/submit/', data).then(
                (response) => {
                    this.props.setOutput((
                        '\n' + response.data.stdout + '\nProcess finished with exit code ' +
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
                    <IconButton color="primary" aria-label="copy" onClick={this.handleCopy}>
                        <ContentCopyIcon/>
                    </IconButton>
                </Grid>
                <Grid xs={3} spacing={3}>
                    <IconButton color="primary" aria-label="save" onClick={this.handleSave}>
                        <SaveIcon/>
                    </IconButton>
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
