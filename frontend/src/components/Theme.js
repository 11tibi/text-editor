import React from 'react';
import {connect} from "react-redux";
import {setTheme} from "../actions/editor";
import IconButton from '@mui/material/IconButton';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import {select_theme} from "../actions/text_area";

const mapState = state => {
    return {
        themes: state.themes,
    };

};

const mapDispatch = {setTheme, select_theme};


class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.handleTheme = this.handleTheme.bind(this);
    }

    handleTheme(event) {
        this.props.setTheme();
        if (this.props.themes.light) {
            this.props.select_theme({id: 3, name: 'tomorrow'});
        } else {
            this.props.select_theme({id: 5, name: 'twilight'});
        }
    }

    render() {
        return (
            <div>
                <IconButton aria-label="theme" onClick={this.handleTheme}>
                    <BrightnessMediumIcon/>
                </IconButton>
            </div>
        )
    }
}

export default (connect(mapState, mapDispatch)(Theme));
