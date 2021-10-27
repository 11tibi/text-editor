import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AceEditor from "react-ace";
import {setCode} from '../actions/code';
import {select_theme} from '../actions/text_area';
import {withRouter} from "react-router";
import {connect} from "react-redux";


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

import 'ace-builds/src-noconflict/mode-c_cpp'

const mapState = state => {
    return {
        editor_theme: state.editor_theme,
        themes: state.themes,
        code: state.code,
    };

};

const mapDispatch = {select_theme, setCode};

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.setCode(value);
    }

    render() {
        return (
            <div>
                <CssBaseline/>
                <AceEditor
                    mode="c_cpp"
                    theme={this.props.editor_theme.name}
                    onChange={this.handleChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4
                    }}
                    fontSize={16}
                />
            </div>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(TextArea));
