import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AceEditor from "react-ace";
import {setCode} from '../actions/code';
import {select_theme} from '../actions/text_area';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/mode-fsharp';
import 'ace-builds/src-noconflict/mode-haskell';
import 'ace-builds/src-noconflict/mode-objectivec';
import 'ace-builds/src-noconflict/mode-pascal';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-vbscript';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-elixir';
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
        if (this.props.themes.light) {
            this.props.select_theme({id: 3, name: 'tomorrow'});
        } else {
            this.props.select_theme({id: 5, name: 'twilight'});
        }
    }

    handleChange(value) {
        this.props.setCode(value);
    }

    render() {
        return (
            <div>
                <CssBaseline/>
                <AceEditor
                    mode={this.props.code.language.mode}
                    theme={this.props.editor_theme.name}
                    onChange={this.handleChange}
                    name="UNIQUE_ID_OF_DIV"
                    style={{width: 'inherit', minHeight: '89vh'}}
                    value={this.props.code.code}
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
