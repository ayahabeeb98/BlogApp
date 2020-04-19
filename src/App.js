import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";

function App() {
    return (
        <div className="App">
            <Router>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup} />
            </Router>
        </div>
    );
}

export default App;
