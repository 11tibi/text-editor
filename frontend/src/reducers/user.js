const user = (state = {id: 0, email: ''}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        default:
            return state;
    }
}

export default user;