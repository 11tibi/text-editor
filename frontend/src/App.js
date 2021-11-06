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
import axiosInstance from "./axiosApi";
import {connect} from "react-redux";
import {setUser} from "./actions/user";


const mapState = state => {
  return {
    user: state.user,
  }
};

const mapDispatch = {setUser};

class App extends React.Component {
    componentDidMount() {
        axiosInstance.get('api/user/').then((response) => {
            this.props.setUser(response.data);
        }).catch((error) => {})
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

export default  connect(mapState, mapDispatch)(App);
