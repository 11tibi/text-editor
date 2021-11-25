import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import axiosInstance from "../axiosApi";
import PrivacySwitch from "./privacySwitch";
import Grid from "@mui/material/Grid";
import {withRouter} from "react-router";
import {setCode, setLanguage, setOutputEmpty, setTitle} from "../actions/code";
import {connect} from "react-redux";

const mapState = state => {
    return {
        code: state.code,
    }
};

const mapDispatch = {setCode, setTitle, setOutputEmpty, setLanguage};

class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            languages: [],
            title: {value: '', error: false},
            languageId: 0,
            public: true,
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleCreate(event) {
        if (this.state.title.value === '') {
            this.setState({title: {value: '', error: true}});
            return;
        }
        let data = {
            language: this.state.languageId,
            public: this.state.public,
            name: this.state.title.value,
            code: '',
        }
        axiosInstance.post('api/code/', data).then((response) => {
            this.props.history.push(`/editor/${response.data.id}/`);
            this.setState({
                isOpen: false,
                languages: [],
                title: {value: '', error: false},
                languageId: 0,
                public: true,
            });
            this.props.setCode(response.data.code);
            this.props.setTitle(response.data.title);
            this.props.setLanguage(response.data.language);
            this.props.setOutputEmpty();
            console.log(response.data);
        });
    }

    handleOpen(event) {
        this.setState({isOpen: true})
        axiosInstance.get('api/language/').then((response) => {
            this.setState({languages: response.data});
        })
    }

    handleClose(event) {
        this.setState({isOpen: false});
    }

    render() {
        return (
            <div>
                <Button color='inherit' mx={3} onClick={this.handleOpen}>
                    Create Project
                </Button>
                <Dialog fullWidth maxWidth='sm' open={this.state.isOpen} onClose={this.handleClose}>
                    <DialogTitle>Create</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box my={2}>
                                Create a project.
                            </Box>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            variant="standard"
                            margin="dense"
                            id="project-name"
                            label="Project Name"
                            type="text"
                            helperText="Please enter a valid name!"
                            value={this.state.title.value}
                            error={this.state.title.error}
                            onChange={(event) =>
                                this.setState({title: {value: event.target.value, error: false}})}
                            fullWidth
                        />
                        <FormControl variant="standard" fullWidth>
                            <Grid my={2} container>
                                <Grid item xs={10}>

                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Language"
                                        sx={10}
                                        fullWidth
                                        onChange={(event) => this.setState({languageId: event.target.value})}
                                    >
                                        <MenuItem key="" value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.state.languages.map((lang) => (
                                            <MenuItem
                                                key={lang.id}
                                                value={lang.id}
                                            >
                                                {lang.name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </Grid>
                                <Grid item xs={2}>
                                    <PrivacySwitch
                                        sx={2}
                                        ml={1}
                                        defaultChecked={true}
                                        onChange={() => this.setState({public: !this.state.public})}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleCreate}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(CreateProject));
