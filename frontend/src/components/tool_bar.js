import React from 'react';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from '@mui/material/FormControl';
import axiosInstance from '../axiosApi';
import {select_theme} from "../actions/text_area";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const mapState = state => {
  return {
    editor_theme: state.editor_theme,
    themes: state.themes,
  }
};

const mapDispatch = {select_theme};

class ToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event, value) {
        let new_data = {id: value.props.value, name: value.props.children};
        this.props.select_theme(new_data);
    }

    render() {
        return (
            <Grid>
                <Grid xs={3}>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <Select
                            value={this.props.editor_theme.id}
                            displayEmpty
                            onChange={this.handleChange}
                        >
                            {this.props.themes.map((themes) => <MenuItem value={themes.id}>{themes.name}</MenuItem >)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3}></Grid>
            </Grid>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(ToolBar));
