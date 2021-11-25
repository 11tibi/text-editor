const initialState = {
    id: 0,
    email: '',
    image: ''
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'SET_IMAGE':
            return {
                ...state,
                image: action.payload,
            };
        default:
            return state;
    }
}

export default user;