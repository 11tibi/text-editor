const authenticated = (state = !!localStorage.getItem('access_token'), action) => {
    switch (action.type) {
        case 'LOGIN':
            return true;
        case 'LOGOUT':
            return false;
        default:
            return state;
    }
}

export default authenticated;
