let initialState = {
    light: true,
};

const themes = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {light: !state.light};
        default:
            return state;
    }
}

export default themes;

