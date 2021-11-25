import React from "react";
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@mui/material/Grid';
import axiosInstance from "../axiosApi";

const mapState = state => {
    return {
        user: state.user,
    }
};

const mapDispatch = {};

class ProfileImage extends React.Component {

    render() {
        return (
            <Grid align='center'>
                <Avatar
                    variant={"rounded"}
                    alt="image"
                    src={this.props.user.image}
                    style={{
                        width: 190,
                        height: 190,
                    }}
                />
            </Grid>
        )
    }
}

export default connect(mapState, mapDispatch)(ProfileImage);
