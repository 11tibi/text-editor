import React from 'react';
import Grid from '@mui/material/Grid';
import ToolBar from './tool_bar';
import OutputArea from './output_area';

class Output extends React.Component {

    render() {
        return(
            <Grid>
                <ToolBar />
                <OutputArea />
            </Grid>
        )
    }
}

export default Output;