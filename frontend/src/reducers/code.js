const code = (state = {code: ''}, action) => {
    switch (action.type) {
        case 'SET_CODE':
            return {
                ...state,
                code: action.payload,
            };
        default:
            return state;
    }
}

export default code;
