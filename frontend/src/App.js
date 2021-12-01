import React from 'react'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Editor from './components/Editor';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import fetchUser from './components/FetchUser';
import theme from "./themes/theme";
import {ThemeProvider} from '@mui/material/styles';
import {connect} from "react-redux";

const mapState = state => {
    return {
        themes: state.themes,
    };

};

const mapDispatch = {}

class App extends React.Component {
    componentDidMount() {
        fetchUser();
    }

    render() {
        return (
            <ThemeProvider theme={
                (this.props.themes.light===true) ?
                    theme('dark') :
                    theme('light')
            }>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path='/login/' component={Login}/>
                    <Route exact path='/register/' component={Register}/>
                    <ProtectedRoute exact path='/dashboard/' component={Dashboard}/>
                    <ProtectedRoute exact path='/editor/:id' component={Editor}/>
                </Switch>
            </Router>
            </ThemeProvider>
        );
    }
}

export default connect(mapState, mapDispatch)(App);
