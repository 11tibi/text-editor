export const setCode = (code) => {
    return {
        type: 'SET_CODE',
        payload: code,
    };
}

export const setLanguage = (language_id) => {
    return {
        type: 'SET_LANGUAGE',
        payload: language_id,
    };
}

export const setOutput = (output) => {
    return {
        type: 'SET_OUTPUT',
        payload: output,
    };
}
