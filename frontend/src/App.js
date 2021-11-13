import React from 'react'
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Editor from './components/editor';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import fetchUser from './components/fetchUser';

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
