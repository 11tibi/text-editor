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

class App extends React.Component {
    componentDidMount() {
        fetchUser();
    }

    render() {
        return (
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path='/login/' component={Login}/>
                    <Route exact path='/register/' component={Register}/>
                    <ProtectedRoute exact path='/dashboard/' component={Dashboard}/>
                    <ProtectedRoute exact path='/editor/:id' component={Editor}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
