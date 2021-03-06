import {createTheme} from '@material-ui/core/styles';

const light = {
    palette: {
        type: 'light',
        background: {
            default: '#DEE4E7',
        },
        primary: {
            main: '#736a4c',
        },
        secondary: {
            main: '#003366',
        },
        navbar: {
            main: '#e7e7e7',
        },
        error: {
            main: '#801313',
        },
    },
};

const dark = {
    palette: {
        type: 'dark',
        background: {
            default: '#121212',
        },
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: '#3700B3',
        },
        navbar: {
            main: '#1e1e1e',
        },
        error: {
            main: '#801313',
        },
    },
};

function theme(mode) {
    if (mode === 'light') {
        return createTheme(light);
    } else if (mode === 'dark') {
        return createTheme(dark);
    }
}

export default theme;
