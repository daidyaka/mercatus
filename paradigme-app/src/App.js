import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";


function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={'/profile'}><Profile user={}/></Route>
                <Route path={'/registration'}><Registration/></Route>
                <Route path={'/login'}><Login/></Route>
                <Route exact path={'/'}><Home/></Route>
                <Route path={'*'}><NotFound/></Route>
            </Switch>
        </Router>
    );
}

export default App;
