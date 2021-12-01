const editor_theme = (state = {id: 1, name: 'tomorrow'}, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return action.payload;
        default:
            return state;
    }
}

export default editor_theme;
