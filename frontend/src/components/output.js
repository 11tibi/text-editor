import React from 'react';
import Grid from '@mui/material/Grid';
import OutputArea from './output_area';

class Output extends React.Component {

    render() {
        return(
            <Grid mx={2}>
                <OutputArea />
            </Grid>
        )
    }
}

export default Output;