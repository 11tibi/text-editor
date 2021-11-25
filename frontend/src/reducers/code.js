const initialState = {
    code: '',
    title: '',
    language: 0,
    output:'',
};

const code = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CODE':
            return {
                ...state,
                code: action.payload,
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            };
        case 'SET_OUTPUT':
            return {
                ...state,
                output: state.output + '\n' + action.payload,
            };
        case 'SET_OUTPUT_EMPTY':
            return {
                ...state,
                output: '',
            };
        case 'SET_TITLE':
            return {
                ...state,
                title:action.payload,
            };
        default:
            return state;
    }
}

export default code;
