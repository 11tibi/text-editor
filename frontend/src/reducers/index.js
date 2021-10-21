import {combineReducers} from "@reduxjs/toolkit";
import authenticated from './authenticated';
import editor_theme from './text_area';
import themes from './editor';

const rootReducer = combineReducers({
    authenticated,
    editor_theme,
    themes,
})

export default rootReducer;