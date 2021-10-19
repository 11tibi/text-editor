import React from "react";
import { Redirect, Route } from "react-router-dom";
import store from '../store';

function ProtectedRoute({component: Component, ...rest}) {
    const state = store.getState();
    return (
        <Route {...rest} render={(props) =>
            state.authenticated ? <Component {...rest} {...props} /> : <Redirect to='/login/' />
        }/>
    )
}

export default ProtectedRoute;