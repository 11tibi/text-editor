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

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/login/' component={Login}/>
                <Route exact path='/register/' component={Register}/>
                <ProtectedRoute exact path='/dashboard/' component={Dashboard}/>
                <ProtectedRoute exact path='/editor/' component={Editor}/>
            </Switch>
        </Router>
    );
}

export default App;
