import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {setOutput} from "../actions/code";
import CssBaseline from "@mui/material/CssBaseline";
import AceEditor from "react-ace";

const mapState = state => {
    return {
        editor_theme: state.editor_theme,
        code: state.code,
    }
};

const mapDispatch = {setOutput};

class OutputArea extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <CssBaseline/>
                <AceEditor
                    mode=""
                    value={this.props.code.output}
                    theme={this.props.editor_theme.name}
                    name="OUTPUT"
                    id='output'
                    style={{width: 'inherit', minHeight: '89vh'}}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        highlightGutterLine: false,
                        highlightActiveLine: false,
                        showLineNumbers: false,
                        enableSnippets: false,
                        showGutter: false,
                        readOnly: true,
                        cursorStyle: 'slim',
                        tabSize: 4,
                    }}
                    fontSize={16}
                />
            </div>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(OutputArea));
