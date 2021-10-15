import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
    return (
        <Router>
            {/*<Navbar/>*/}
            <Switch>
                <Route exact path='/login/' component={Login}/>
                <Route exact path='/register/' component={Register}/>
                {/*<Route exact path='/dashboard/' component={Dashboard}/>*/}
            </Switch>
        </Router>
    );
}

export default App;
