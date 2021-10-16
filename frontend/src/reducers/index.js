import {combineReducers} from "@reduxjs/toolkit";
import authenticated from './authenticated';

const rootReducer = combineReducers({
    authenticated,
})

export default rootReducer;