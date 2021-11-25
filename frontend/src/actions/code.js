export const setCode = (code) => {
    return {
        type: 'SET_CODE',
        payload: code,
    };
}

export const setLanguage = (language) => {
    return {
        type: 'SET_LANGUAGE',
        payload: language,
    };
}

export const setOutput = (output) => {
    return {
        type: 'SET_OUTPUT',
        payload: output,
    };
}

export const setOutputEmpty = (output) => {
    return {
        type: 'SET_OUTPUT_EMPTY',
    }
}

export const setTitle = (title) => {
    return {
        type: 'SET_TITLE',
        payload: title,
    }
}
