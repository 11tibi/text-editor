const code = (state = {code: '', language_id: 71, output:''}, action) => {
    switch (action.type) {
        case 'SET_CODE':
            return {
                ...state,
                code: action.payload,
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                language_id: action.payload,
            };
        case 'SET_OUTPUT':
            return {
                ...state,
                output: state.output + '\n' + action.payload,
            };
        default:
            return state;
    }
}

export default code;
